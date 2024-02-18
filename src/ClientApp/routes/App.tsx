import * as React from "react";
import EventManager from "../../Codebase/Base/EventManager";
import { EventType } from "../../Codebase/Types/EventType";
import NotifyModalUI from "../components/NotifyModalUI";
import Stage2 from "../components/Stage2";
import Stage3 from "../components/Stage3";
import Layout from "../layouts/Layout";
import { validationSingleFile } from "../plugins/file-upload-plugin";
import Review from "./Review";
import BaseService from "../services/BaseService";
import { useEffect,useState } from "react";
import CoreEngineClient from "../AR/CoreEngineClient";

const stageInit = {
  step: 1,
  pathImageActive: "",
  isLoading: false,
  errorName: "",
  imageUpload: "",
  imageCapture: "",
  message: "",
  uuid: "c33282db-66b6-4a1a-ae86-7ebdb043696a",
  isAuth: false,
  isOpenMouth: false,
};

function App(props: any)
{
  const [stage,setStage] = useState(stageInit);

  useEffect(() =>
  {
    async function init()
    {
      setStage({ ...stage,isLoading: true });
      let errorName = "";
      await CoreEngineClient.Instance.Initialize();

      // try {
      //   const data = await BaseService.Instance.checkUUID(
      //     "c33282db-66b6-4a1a-ae86-7ebdb043696a"
      //   );
      //   if (data.success) {
      //     // await CoreEngineClient.Instance.Initialize();
      //   } else {
      //     errorName = data.message;
      //   }
      // } catch (error) {
      //   error = "Lỗi hệ thống. Vui lòng thử lại";
      // }

      setStage({ ...stage,isLoading: false,errorName: errorName });
    }
    init();

    let newStage = stage;
    EventManager.Instance.Subscribe(EventType.OPEN_MOUTH_VIEW,() =>
    {
      if (newStage.isOpenMouth == false)
      {
        setStage({ ...newStage,isOpenMouth: true });
      }
    });
  },[]);

  const handleNext = () =>
  {
    if (!stage.isOpenMouth) return;
    if (stage.step == 1)
    {
      EventManager.Instance.Emit(EventType.NEXT_SCENE);
    }
    setStage({ ...stage,step: stage.step + 1 });
  };

  const handleShareBtn = async () =>
  {
    if (stage.step == 5)
    {
      if (stage.imageCapture)
      {
        setStage({
          ...stage,
          step: 6,
        });
      } else
      {
        setStage({
          ...stage,
          step: 5,
          isLoading: true,
        });
        EventManager.Instance.Emit(
          EventType.CAPTURE_IMAGE,
          (urlImage: string) =>
          {
            setStage({
              ...stage,
              step: 6,
              imageCapture: urlImage,
              isLoading: false,
            });
          }
        );
      }
    }
    if (stage.step == 6)
    {
      setStage({ ...stage,isLoading: true });
      try
      {
        let formData = new FormData();
        formData.append("uuid",stage.uuid);
        formData.append("image",stage.imageCapture);
        const { success,message,data } =
          await BaseService.Instance.submitARImage(formData);
        setStage({ ...stage,isLoading: false,message });
      } catch (error)
      {
        setStage({
          ...stage,
          isLoading: false,
          errorName: "Lỗi hệ thống vui lòng thử lại",
        });
      }
    }
  };

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) =>
  {
    const errorFile = validationSingleFile(e.target.files,"image");
    if (!errorFile)
    {
      const file = e.target.files[0];
      e.target.value = "";
      setStage({
        ...stage,
        step: 5,
        imageUpload: URL.createObjectURL(file),
      });
    } else
    {
      setStage({ ...stage,errorName: errorFile });
    }
  };

  const handleCaptureImage = () =>
  {
    setStage({ ...stage,step: 5,isLoading: true });
    EventManager.Instance.Emit(EventType.CAPTURE_IMAGE,(urlImage: string) =>
    {
      setStage({ ...stage,step: 5,imageCapture: urlImage,isLoading: false });
    });
  };

  const handleBack = () =>
  {
    if (stage.step == 2)
    {
      setStage({ ...stage,step: 1 });
    }
    if (stage.step == 3)
    {
      setStage({ ...stage,step: 2,pathImageActive: "" });
    }
    if (stage.step == 4)
    {
      setStage({ ...stage,step: 3,pathImageActive: "" });
    }
    if (stage.step == 5)
    {
      setStage({ ...stage,step: 4,imageUpload: "",imageCapture: "" });
    }
    if (stage.step == 6)
    {
      setStage({ ...stage,step: 4,imageUpload: "",imageCapture: "" });
    }
  };

  const closeNotifyHandler = () =>
  {
    setStage({ ...stage,errorName: "",isLoading: false,message: "" });
  };

  return (
    <>
      <Layout>
        <div
          className={`relative top-[50%] -translate-y-1/2 ${ stage.step == 6 ? "invisible" : ""
            }`}
        >
          <p className="mb-20 relative text-4xl leading-relaxed w-3/4 mx-auto font-black text-center text-blue-color uppercase ">
            Hút sữa sẵn sàng dinh dưỡng cùng Abbott Grow Gold
            <img
              className="absolute top-[45px] left-[45px]"
              src="/Assets/images/border-text.png"
              alt="Hút sữa sẵn sàng dinh dưỡng cùng Abbott Grow Gold"
            />
          </p>
          <img
            className="absolute -top-[50px] left-0"
            src="/Assets/images/element-group.png"
            alt="Hút sữa sẵn sàng dinh dưỡng cùng Abbott Grow Gold"
          />
          <div className=" relative mb-10">
            {stage.pathImageActive ? (
              <img
                className="absolute -top-[0px] left-0 z-10"
                src="/Assets/images/label-2.png"
                alt="Hút sữa sẵn sàng dinh dưỡng cùng Abbott Grow Gold"
              />
            ) : (
              <img
                className="absolute -top-[130px] left-0 z-10"
                src="/Assets/images/label.png"
                alt="Hút sữa sẵn sàng dinh dưỡng cùng Abbott Grow Gold"
              />
            )}
            <img
              className="absolute bottom-[300px] right-0 z-10"
              src="/Assets/images/book1.png"
              alt="Hút sữa sẵn sàng dinh dưỡng cùng Abbott Grow Gold"
            />
            {stage.step == 4 || stage.step == 5 || stage.pathImageActive ? (
              ""
            ) : (
              <img
                className="absolute -bottom-[10px] right-0 z-10"
                src="/Assets/images/toy.png"
                alt="Hút sữa sẵn sàng dinh dưỡng cùng Abbott Grow Gold"
              />
            )}
            <div id="canvas-wrapper">
              <img
                className="absolute -bottom-2 -left-2 z-0"
                src="/Assets/images/yard.png"
                alt="Hút sữa sẵn sàng dinh dưỡng cùng Abbott Grow Gold"
              />

              <img
                className={`absolute w-[29%] bottom-[10%] -left-0 z-0 ${ stage.step == 1 ? "" : "invisible"
                  }`}
                src="/Assets/images/hop_sua.png"
                alt="Hút sữa sẵn sàng dinh dưỡng cùng Abbott Grow Gold"
              />
              {/* <img
                className={`absolute w-[28%]  bottom-[7%] left-[31%] z-0 ${
                  stage.step == 1 ? "" : "invisible"
                }`}
                src="/Assets/images/hop_sua_part.png"
                alt="Hút sữa sẵn sàng dinh dưỡng cùng Abbott Grow Gold"
              /> */}
              <Stage2 stage={stage} />

              {stage.step == 3 ? (
                <Stage3 handlePathImageActive={setStage} stage={stage} />
              ) : (
                ""
              )}

              {stage.pathImageActive ? (
                <img
                  className="absolute w-full top-0 left-0 z-0"
                  src={stage.pathImageActive}
                  alt="Hút sữa sẵn sàng dinh dưỡng cùng Abbott Grow Gold"
                />
              ) : (
                ""
              )}

              <div
                className={`${ stage.step == 5 ? `invisible` : `` }`}
                style={{}}
                id="viewportLayout"
              >
                <canvas id="output_canvas"></canvas>
              </div>

              <img
                className={`${ stage.step == 5 ? `` : `hidden`
                  } absolute top-[50%] left-[50%] -translate-y-1/2 -translate-x-1/2 -z-10`}
                src={stage.imageCapture || stage.imageUpload}
                alt="Hút sữa sẵn sàng dinh dưỡng cùng Abbott Grow Gold"
              />

              {stage.step == 1 ? (
                <p className="absolute bottom-0 left-10 text-white text-2xl">
                  (*) Dành cho trẻ bắt đầu vào mẫu giáo
                </p>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="w-[90%] mx-auto flex justify-between px-6">
            {stage.step == 4 || stage.step == 5 ? (
              <>
                <button
                  className="btn-custom btn-back btn-back-step"
                  onClick={handleBack}
                >
                  <div></div> Quay lại
                </button>

                {stage.step == 4 ? (
                  <div className="relative" onClick={handleCaptureImage}>
                    <img
                      src="/Assets/images/camera-icon.png"
                      alt="Hút sữa sẵn sàng dinh dưỡng cùng Abbott Grow Gold"
                    />
                    <p className="absolute top-[100%] left-[50%] -translate-x-1/2 text-red-color text-4xl font-black w-full text-center whitespace-nowrap ">
                      Chụp
                    </p>
                  </div>
                ) : (
                  ""
                )}
                {stage.step == 4 ? (
                  <>
                    <label
                      htmlFor="upload-image"
                      className="btn-custom btn-back"
                    >
                      <img
                        className="w-[38px]"
                        src="/Assets/images/upload-icon.png"
                        alt="Hút sữa sẵn sàng dinh dưỡng cùng Abbott Grow Gold"
                      />{" "}
                      Up Ảnh
                    </label>
                    <input
                      type="file"
                      hidden
                      id="upload-image"
                      onChange={handleUploadImage}
                      accept=".jpg, .png, .jpeg"
                    />
                  </>
                ) : (
                  <button
                    onClick={handleShareBtn}
                    className={`btn-custom btn-next ${ stage.step == 5 ? "" : "invisible"
                      }`}
                  >
                    Chia sẻ{" "}
                    <img
                      src="/Assets/images/fb-icon.png"
                      alt="Hút sữa sẵn sàng dinh dưỡng cùng Abbott Grow Gold"
                    />
                  </button>
                )}
              </>
            ) : (
              <>
                <button
                  className={`btn-custom btn-back btn-back-step ${ stage.step == 1 ? "invisible" : ""
                    }`}
                  onClick={handleBack}
                >
                  <div></div> Quay lại
                </button>
                <button
                  className={`btn-custom btn-next btn-next-step ${ stage.isOpenMouth ? "active" : ""
                    }`}
                  onClick={handleNext}
                >
                  Tiếp tục <div></div>
                </button>
              </>
            )}
          </div>
        </div>
        {stage.step == 6 ? (
          <div className="absolute top-[50%] -translate-y-1/2">
            <Review
              imageSave={stage.imageCapture || stage.imageUpload}
              handleBack={handleBack}
              handleShareBtn={handleShareBtn}
              isShow={stage.step == 6 ? true : false}
            />
          </div>
        ) : (
          <></>
        )}
      </Layout>

      <NotifyModalUI
        isLoading={stage.isLoading}
        onClose={closeNotifyHandler}
        errorName={stage.errorName}
      />
    </>
  );
}

export default App;
