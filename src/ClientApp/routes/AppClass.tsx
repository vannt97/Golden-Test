import * as React from "react";
import EventManager from "../../Codebase/Base/EventManager";
import { EventType } from "../../Codebase/Types/EventType";
import BaseService from "../services/BaseService";
import { validationSingleFile } from "../plugins/file-upload-plugin";
import Layout from "../layouts/Layout";
import Stage2 from "../components/Stage2";
import Stage3, {
  btnsMonHocHighLight,
  btnsTroChoiHighLight,
} from "../components/Stage3";
import Review from "./Review";
import NotifyModalUI from "../components/NotifyModalUI";
import {
  detectInAppBrowser,
  getValueFromURL,
  shareFB,
} from "../utils/main-util";
import CoreEngineClient from "../AR/CoreEngineClient";
import { RESOLUTION_CANVAS_WRAPPER } from "../../GLOBAL_CONFIG";

const btnsHighLight = [...btnsMonHocHighLight, ...btnsTroChoiHighLight];
export default class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      step: 1,
      pathImageActive: "",
      pathImageCutOutActive: "",
      pathGifActive: {},
      isLoading: false,
      errorName: "",
      imageUpload: "",
      imageCapture: "",
      message: "",
      uuid: "",
      isAuth: false,
      cacheEventStage2: null,
      isAuthStep2: false,
      isAuthStep3: false,
      imageAnimations: [],
      isAuthStep1: false,
      linkShare: "",
      linkRedirect: "",
      isLoadedCamera: false,
      isLoadedFaceTracker: false,
    };

    EventManager.Instance.Subscribe(EventType.NEXT_SCENE_1_VIEW, () => {
      if (this.state.isAuthStep1) return;
      this.setState({ ...this.state, step: 2, isAuthStep1: true });
      EventManager.Instance.Emit(EventType.ON_START_GAME);
      EventManager.Instance.Emit(EventType.NEXT_SCENE);
    });

    EventManager.Instance.Subscribe(EventType.IS_LOADED_CAMERA, () => {
      if (this.state.isLoadedCamera) return;
      this.setState({
        ...this.state,
        isLoadedCamera: true,
      });
    });

    EventManager.Instance.Subscribe(EventType.IS_LOADED_FACETRACKER, () => {
      if (this.state.isLoadedFaceTracker) return;
      this.setState({
        ...this.state,
        isLoadedFaceTracker: true,
      });
    });
  }

  componentDidUpdate(
    prevProps: Readonly<any>,
    prevState: Readonly<any>,
    snapshot?: any
  ): void {
    if (this.state.isLoadedCamera && this.state.isLoadedFaceTracker) {
      if (!this.state.isAuthStep1) {
        this.setState({ ...this.state, isAuthStep1: true });
        setTimeout(() => {
          this.setState({ ...this.state, step: 2 });
          EventManager.Instance.Emit(EventType.ON_START_GAME);
          EventManager.Instance.Emit(EventType.NEXT_SCENE);
          EventManager.Instance.Emit(EventType.SUA);
          let btnSUA = (document.querySelectorAll(".img-stage-2")[2] as HTMLElement);
          (btnSUA as HTMLImageElement).src = btnSUA.dataset.highlight;
          (btnSUA as HTMLImageElement).style.transform = "translateX(-50%) scale(1.05)";
          // (document.querySelectorAll(".img-stage-2")[2] as HTMLElement).click();
        }, 1500);
      }
    }

    if (!this.state.imageUpload) return;

    if (prevState.imageUpload != this.state.imageUpload) {
      this.setState({ ...this.state, step: 5, isLoading: true });
      EventManager.Instance.Emit(
        EventType.CAPTURE_IMAGE,
        (urlImage: string) => {
          this.setState({
            ...this.state,
            step: 5,
            imageCapture: urlImage,
            isLoading: false,
          });
        }
      );
    }
  }

  componentDidMount(): void {
    if (window.location.hash.includes("#cb=")) {
      window.parent.location.href = this.state.linkRedirect;
    }

    document.getElementById("canvas-wrapper").style.height =
      document.getElementById("canvas-wrapper").clientWidth /
        RESOLUTION_CANVAS_WRAPPER +
      "px";

    const init = async () => {
      this.setState({ ...this.state, isLoading: true });

      let errorName = "";
      ////////////////////////////////////////////
      await CoreEngineClient.Instance.Initialize();

      this.setState({
        ...this.state,
        isLoading: false,
        errorName: errorName,
      });

      // try {
      //   const data = await BaseService.Instance.checkUUID(
      //     getValueFromURL("uuid") ? getValueFromURL("uuid") : ""
      //   );
      //   if (data.success) {
      //     await CoreEngineClient.Instance.Initialize();
      //   } else {
      //     errorName = data.message;
      //   }
      //   this.setState({
      //     ...this.state,
      //     isLoading: false,
      //     errorName: errorName,
      //     uuid: getValueFromURL("uuid"),
      //   });
      // } catch (error) {
      //   error = "Lỗi hệ thống. Vui lòng thử lại";
      //   this.setState({
      //     ...this.state,
      //     isLoading: false,
      //     errorName: errorName,
      //   });
      // }
    };
    init();
  }

  handleNext = () => {
    EventManager.Instance.Emit(EventType.ON_CLICK);

    if (this.state.step == 1) {
      EventManager.Instance.Emit(EventType.ON_START_GAME);
      EventManager.Instance.Emit(EventType.NEXT_SCENE);
      this.setState({ ...this.state, step: 2 });
    }

    if (this.state.step == 2) {
      // // flow normal
      // EventManager.Instance.Emit(EventType.CLEAR_ITEM_STAGE_2);
      // this.setState({ ...this.state, step: 3 });

      // flow random
      let btnRandom =
        btnsHighLight[Math.floor(Math.random() * btnsHighLight.length)];
      EventManager.Instance.Emit(btnRandom.eventType);
      this.setState({
        ...this.state,
        step: 4,
        pathImageActive: btnRandom.pathImage,
        pathGifActive: btnRandom.gif,
        imageAnimations: btnRandom.imageAnimations
          ? btnRandom.imageAnimations
          : [],
        isAuthStep3: true,
        pathImageCutOutActive: btnRandom.pathImageCutout,
      });
    }

    if (this.state.step == 3) {
      EventManager.Instance.Emit(this.state.cacheEventStage2);
      this.setState({ ...this.state, step: 4 });
    }
  };

  handleBack = () => {
    EventManager.Instance.Emit(EventType.ON_CLICK);
    if (this.state.step == 2) {
      this.setState({ ...this.state, step: 1 });
    }
    if (this.state.step == 3) {
      EventManager.Instance.Emit(this.state.cacheEventStage2);
      EventManager.Instance.Emit(EventType.CLEAR_ITEM_STAGE_3);

      this.setState({
        ...this.state,
        step: 2,
        pathImageActive: "",
        pathGifActive: {},
      });
    }
    if (this.state.step == 4) {
      // // flow normal
      // EventManager.Instance.Emit(EventType.CLEAR_ITEM_STAGE_3);
      // EventManager.Instance.Emit(EventType.CLEAR_ITEM_STAGE_2);
      // this.setState({
      //   ...this.state,
      //   step: 3,
      //   isAuthStep3: false,
      //   pathImageActive: "",
      //   pathGifActive: {},
      // });
      // flow random
      EventManager.Instance.Emit(EventType.CLEAR_ITEM_STAGE_3);
      this.setState({
        ...this.state,
        step: 2,
        isAuthStep2: true,
        pathImageActive: "",
        pathGifActive: {},
      });
    }

    if (this.state.step == 5) {
      this.setState({
        ...this.state,
        step: 4,
        imageUpload: "",
        imageCapture: "",
      });
    }

    if (this.state.step == 6) {
      this.setState({
        ...this.state,
        step: 4,
        imageUpload: "",
        imageCapture: "",
      });
    }
  };

  handleShareBtn = async () => {
    EventManager.Instance.Emit(EventType.ON_CLICK);

    if (this.state.step == 5) {
      this.setState({
        ...this.state,
        step: 5,
        isLoading: true,
      });

      if (this.state.imageCapture) {
        let formData = new FormData();
        formData.append("uuid", this.state.uuid);
        formData.append("image", this.state.imageCapture);
        const { success, message, data } =
          await BaseService.Instance.submitARImage(formData);
        if (success) {
          this.setState({
            ...this.state,
            isLoading: false,
            step: 6,
            linkShare: data.share_path,
            linkRedirect: data.facebook_redirect_url,
          });
        } else {
          this.setState({
            ...this.state,
            isLoading: false,
            errorName: "Lỗi hệ thống. Vui lòng thử lại",
          });
        }
      } else {
        EventManager.Instance.Emit(
          EventType.CAPTURE_IMAGE,
          async (urlImage: string) => {
            let formData = new FormData();
            formData.append("uuid", this.state.uuid);
            formData.append("image", urlImage);
            const { success, message, data } =
              await BaseService.Instance.submitARImage(formData);
            if (success) {
              this.setState({
                ...this.state,
                imageCapture: urlImage,
                isLoading: false,
                step: 6,
                linkShare: data.share_path,
                linkRedirect: data.facebook_redirect_url,
              });
            } else {
              this.setState({
                ...this.state,
                isLoading: false,
                errorName: "Lỗi hệ thống. Vui lòng thử lại",
              });
            }
            // this.setState({
            //   ...this.state,
            //   step: 6,
            //   imageCapture: urlImage,
            //   isLoading: false,
            // });
          }
        );
      }
    }
    if (this.state.step == 6) {
      // this.setState({ ...this.state, isLoading: true });
      shareFB(
        2,
        {
          hashtag: "#AbbottGrowGold",
          linkShare: this.state.linkShare,
          linkRedirect: this.state.linkRedirect,
        },
        (res: any) => {
          // console.log("res: ", res);
          // this.setState({ ...this.state, isLoading: false });
        }
      );
    }
  };

  handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    EventManager.Instance.Emit(EventType.ON_CLICK);

    const errorFile = validationSingleFile(e.target.files, "image");
    if (!errorFile) {
      const file = e.target.files[0];
      e.target.value = "";
      this.setState({
        ...this.state,
        imageUpload: URL.createObjectURL(file),
      });
    } else {
      this.setState({ ...this.state, errorName: errorFile });
    }
  };

  handleCaptureImage = () => {
    EventManager.Instance.Emit(EventType.ON_CLICK);
    this.setState({ ...this.state, step: 5, isLoading: true });
    EventManager.Instance.Emit(EventType.CAPTURE_IMAGE, (urlImage: string) => {
      this.setState({
        ...this.state,
        step: 5,
        imageCapture: urlImage,
        isLoading: false,
      });
    });
  };

  closeNotifyHandler = () => {
    EventManager.Instance.Emit(EventType.ON_CLICK);
    this.setState({
      ...this.state,
      errorName: "",
      isLoading: false,
      message: "",
    });
  };

  renderImageAnimations = () => {
    return this.state.imageAnimations.map((item: any, index: any) => {
      return (
        <img
          src={item.url}
          className={`absolute animation-image-${index} z-10`}
          style={{ top: item.top, left: item.left, width: item.width }}
          alt=""
          key={index}
        />
      );
    });
  };

  render(): React.ReactNode {
    return (
      <>
        <Layout>
          <img
            className="hidden w-auto xl:w-[70%] md:block absolute top-[6%] left-0"
            src="/Assets/images/element-group.png"
            alt="Hút sữa sẵn sàng dinh dưỡng cùng Abbott Grow Gold"
          />
          <div
            className={`w-auto xl:w-[40%]  lg:w-[60%] relative top-[50%] -translate-y-1/2 mx-auto ${
              this.state.step == 6 ? "invisible" : ""
            }`}
          >
            {this.state.step == 1 ? (
              <p className="text-balance mb-5 relative xl:text-xl leading-relaxed w-3/4 mx-auto font-black text-center text-blue-color uppercase ">
                <span className="relative">
                  Hút sữa
                  <img
                    className="absolute -bottom-[3px] left-[0px]"
                    src="/Assets/images/border-text.png"
                    alt="Hút sữa sẵn sàng dinh dưỡng cùng Abbott Grow Gold"
                  />
                </span>{" "}
                sẵn sàng dinh dưỡng cùng Abbott Grow Gold
              </p>
            ) : (
              ""
            )}
            {this.state.step == 2 ? (
              <p className="text-balance mb-5 relative xl:text-xl leading-relaxed w-3/4 mx-auto font-black text-center text-blue-color uppercase ">
                CHỌN VẬT DỤNG ĐI MẪU GIÁO MÀ BÉ{" "}
                <span className="relative">
                  THÍCH NHẤT
                  <img
                    className="absolute -bottom-[3px] left-[0px]"
                    src="/Assets/images/border-text.png"
                    alt="CHỌN VẬT DỤNG ĐI MẪU GIÁO MÀ BÉ THÍCH NHẤT NHA!"
                  />
                </span>{" "}
                NHA!
              </p>
            ) : (
              ""
            )}
            {this.state.step == 3 ? (
              <p className="text-balance mb-5 relative xl:text-xl leading-relaxed px-0 mx-auto font-black text-center text-blue-color uppercase ">
                CHỌN 1 MÔN HỌC HOẶC 1 TRÒ CHƠI BÉ THÍCH NHẤT{" "}
                <span className="relative">
                  THÍCH NHẤT
                  <img
                    className="absolute -bottom-[3px] left-[0px]"
                    src="/Assets/images/border-text.png"
                    alt="CHỌN VẬT DỤNG ĐI MẪU GIÁO MÀ BÉ THÍCH NHẤT NHA!"
                  />
                </span>{" "}
                Ở MẪU GIÁO NHA!
              </p>
            ) : (
              ""
            )}
            {this.state.step > 3 ? (
              <p className="text-balance mb-5 relative text-sm xl:text-xl leading-relaxed  mx-auto font-black text-center text-blue-color uppercase ">
                BÉ HÃY TẠO DÁNG CAO LỚN, THÔNG MINH SẴN SÀNG ĐẾN TRƯỜNG{" "}
                <span className="relative">
                  THEO CÁCH RIÊNG
                  <img
                    className="absolute -bottom-[3px] left-[0px]"
                    src="/Assets/images/border-text.png"
                    alt="CHỌN VẬT DỤNG ĐI MẪU GIÁO MÀ BÉ THÍCH NHẤT NHA!"
                  />
                </span>{" "}
                NHA!
              </p>
            ) : (
              ""
            )}
            <img
              className="md:hidden absolute -top-[50px] left-0"
              src="/Assets/images/element-group.png"
              alt="Hút sữa sẵn sàng dinh dưỡng cùng Abbott Grow Gold"
            />
            <div className="w-full md:w-[60%] mx-auto relative mb-4  overflow-hidden xl:overflow-visible">
              {this.state.step == 1 || this.state.step == 2 ? (
                this.state.pathImageActive ? (
                  <img
                    className="absolute w-[50px] -top-[0px] xl:-top-[9%] left-0 z-20"
                    src="/Assets/images/label-2.png"
                    alt="Hút sữa sẵn sàng dinh dưỡng cùng Abbott Grow Gold"
                  />
                ) : (
                  <img
                    className="absolute w-[50px] -top-[0px] xl:-top-[9%] left-0 z-20"
                    src="/Assets/images/label.png"
                    alt="Hút sữa sẵn sàng dinh dưỡng cùng Abbott Grow Gold"
                  />
                )
              ) : (
                ""
              )}
              <img
                className="absolute w-[19%] bottom-[100px] -right-[6%] z-20"
                src="/Assets/images/book1.png"
                alt="Hút sữa sẵn sàng dinh dưỡng cùng Abbott Grow Gold"
              />
              {this.state.step == 4 ||
              this.state.step == 5 ||
              this.state.pathImageActive ? (
                ""
              ) : (
                <img
                  className="absolute w-[100px] -bottom-[4px] lg:bottom-0 right-0 lg:right-[4%] z-10"
                  src="/Assets/images/toy.png"
                  alt="Hút sữa sẵn sàng dinh dưỡng cùng Abbott Grow Gold"
                />
              )}
              <div id="canvas-wrapper">
                {this.state.step == 1 ? (
                  <p
                    className="absolute uppercase  m-0 w-full text-center top-[5%] font-black z-20"
                    style={{ color: "#ff8400" }}
                  >
                    bé há miệng để hút dinh dưỡng
                  </p>
                ) : (
                  ""
                )}

                <img
                  className="absolute -bottom-2 -left-1 z-0"
                  src="/Assets/images/yard.png"
                  alt="Hút sữa sẵn sàng dinh dưỡng cùng Abbott Grow Gold"
                />
                {this.state.step == 1 ? (
                  <img
                    className={`absolute w-[25%] bottom-[10%] -left-0 z-0 `}
                    src="/Assets/images/hop_sua.png"
                    alt="Hút sữa sẵn sàng dinh dưỡng cùng Abbott Grow Gold"
                  />
                ) : (
                  ""
                )}

                <Stage2
                  stage={this.state}
                  handState={(eventType: any, isAuthStep2: boolean) => {
                    this.setState({
                      ...this.state,
                      cacheEventStage2: eventType,
                      isAuthStep2,
                    });
                  }}
                />

                {this.state.step == 3 ? (
                  <Stage3
                    handlePathImageActive={(stateNew: any) => {
                      this.setState({ ...stateNew });
                    }}
                    stage={this.state}
                  />
                ) : (
                  ""
                )}

                {this.state.step == 4 ? (
                  <img
                    className="absolute w-full top-0 left-0 z-0"
                    src={
                      this.state.pathImageCutOutActive ||
                      this.state.pathImageActive
                    }
                    alt="Hút sữa sẵn sàng dinh dưỡng cùng Abbott Grow Gold"
                  />
                ) : (
                  ""
                )}

                {this.state.step == 4 ? this.renderImageAnimations() : ""}

                {this.state.step == 4 ? (
                  <img
                    className={`absolute w-full z-10 ${
                      this.state.step == 3 ? "invisible" : ""
                    }`}
                    style={{
                      top: this.state.pathGifActive.top,
                      left: this.state.pathGifActive.left,
                    }}
                    src={this.state.pathGifActive.url}
                    alt="Hút sữa sẵn sàng dinh dưỡng cùng Abbott Grow Gold"
                  />
                ) : (
                  ""
                )}

                <div
                  className={`${
                    this.state.step == 5 || this.state.imageUpload
                      ? `invisible`
                      : ``
                  } `}
                  style={{}}
                  id="viewportLayout"
                >
                  <canvas id="output_canvas"></canvas>
                </div>

                {this.state.step == 4 ? (
                  <img
                    className={`${
                      this.state.imageUpload ? `` : `hidden`
                    } absolute top-[50%] left-[50%] -translate-y-1/2 -translate-x-1/2 -z-1`}
                    src={this.state.imageUpload}
                    alt="Hút sữa sẵn sàng dinh dưỡng cùng Abbott Grow Gold"
                  />
                ) : (
                  ""
                )}

                <img
                  className={`${
                    this.state.step == 5 ? `` : `hidden`
                  } absolute top-[50%] left-[50%] -translate-y-1/2 -translate-x-1/2 z-10`}
                  src={this.state.imageCapture}
                  alt="Hút sữa sẵn sàng dinh dưỡng cùng Abbott Grow Gold"
                />

                {this.state.step == 1 ? (
                  <p className="absolute bottom-0 left-5 text-xs text-white ">
                    (*) Dành cho trẻ bắt đầu vào mẫu giáo
                  </p>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="w-[90%] md:w-[60%] lg:w-[60%] xl:w-[60%] mx-auto flex justify-between px-2 xl:px-6">
              {this.state.step == 4 || this.state.step == 5 ? (
                <>
                  <button
                    className="btn-custom btn-back btn-back-step"
                    onClick={this.handleBack}
                  >
                    <div></div> Quay lại
                  </button>

                  {this.state.step == 4 ? (
                    <div
                      className="relative w-[40px]"
                      onClick={this.handleCaptureImage}
                    >
                      <img
                        src="/Assets/images/camera-icon.png"
                        alt="Hút sữa sẵn sàng dinh dưỡng cùng Abbott Grow Gold"
                      />
                      <p className="absolute top-[100%] left-[50%] -translate-x-1/2 text-red-color  font-black w-full text-center whitespace-nowrap ">
                        Chụp
                      </p>
                    </div>
                  ) : (
                    ""
                  )}
                  {this.state.step == 4 ? (
                    <>
                      <label
                        htmlFor="upload-image"
                        className="btn-custom btn-back"
                      >
                        <img
                          className="w-[20px]"
                          src="/Assets/images/upload-icon.png"
                          alt="Hút sữa sẵn sàng dinh dưỡng cùng Abbott Grow Gold"
                        />{" "}
                        Up Ảnh
                      </label>
                      <input
                        type="file"
                        hidden
                        id="upload-image"
                        onChange={this.handleUploadImage}
                        accept=".jpg, .png, .jpeg"
                      />
                    </>
                  ) : (
                    <button
                      onClick={this.handleShareBtn}
                      className={`btn-custom btn-next btn-next-review ${
                        this.state.step == 5 ? "" : "invisible"
                      }`}
                    >
                      Chia sẻ{" "}
                      <img
                        className="w-[20px]"
                        src="/Assets/images/fb-icon.png"
                        alt="Hút sữa sẵn sàng dinh dưỡng cùng Abbott Grow Gold"
                      />
                    </button>
                  )}
                </>
              ) : (
                <>
                  <button
                    className={`btn-custom btn-back btn-back-step ${
                      this.state.step == 1 || this.state.step == 2
                        ? "invisible"
                        : ""
                    }`}
                    onClick={this.handleBack}
                  >
                    <div></div> Quay lại
                  </button>
                  <button
                    className={`btn-custom btn-next btn-next-step ${
                      this.state.step == 1 ? "invisible" : ""
                    }`}
                    onClick={this.handleNext}
                    disabled={
                      (this.state.isAuthStep2 == false &&
                        this.state.step == 2) ||
                      (this.state.isAuthStep3 == false && this.state.step == 3)
                        ? true
                        : false
                    }
                  >
                    Tiếp tục <div></div>
                  </button>
                </>
              )}
            </div>
          </div>

          {this.state.step == 6 ? (
            <div className="absolute w-full md:w-auto top-[50%] -translate-y-1/2 left-[50%] -translate-x-1/2">
              <Review
                imageSave={this.state.imageCapture}
                handleBack={this.handleBack}
                handleShareBtn={this.handleShareBtn}
                isShow={this.state.step == 6 ? true : false}
              />
            </div>
          ) : (
            <></>
          )}
        </Layout>
        <NotifyModalUI
          isLoading={this.state.isLoading}
          onClose={this.closeNotifyHandler}
          errorName={this.state.errorName || this.state.message}
        />
      </>
    );
  }
}
