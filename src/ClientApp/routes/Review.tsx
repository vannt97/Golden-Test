import * as React from "react";
import Layout from "../layouts/Layout";

export default function Review(props: any) {
  return (
    <>
      <p className="mb-3 relative z-20 text-base xl:text-xl px-0 xl:px-8 leading-relaxed mx-auto font-black text-center  uppercase ">
        chia sẻ ảnh bé lớn khôn khác biệt để nhận quà mẹ nhé
      </p>
      <img
        className="inline lg:hidden xl:hidden absolute -top-[50px] left-0 -z-1"
        src="/Assets/images/element-group.png"
        alt="Hút sữa sẵn sàng dinh dưỡng cùng Abbott Grow Gold"
      />
      <div id="bulletin-board" className="w-[80%] lg:w-[50%] xl:w-[45%]">
        <div className="bg-orange-dark-color pt-2 pb-4 rounded-t-2xl">
          <p className="uppercase text-white text-center  font-black">
            Mẹ lưu ý
          </p>
        </div>
        <div className="relative bg-board pt-2 pb-5 ps-2 pe-2 rounded-b-2xl">
          <div className="board ">
            <div className="w-[75%] mx-auto ">
              <p className="flex items-center  font-bold mb-1 text-sm xl:text-base  ">
                <img
                  className="me-2 w-[30px]"
                  src="/Assets/images/trai-dat-icon.png"
                  alt="chia sẻ ảnh bé lớn khôn khác biệt để nhận quà mẹ nhé"
                />
                <span className="text-blue-color me-1">Để chế độ </span> công
                khai
              </p>
              <p className="flex items-center font-bold mb-1 text-sm xl:text-base ">
                <img
                  className="me-2 w-[30px]"
                  src="/Assets/images/hash-icon.png"
                  alt="chia sẻ ảnh bé lớn khôn khác biệt để nhận quà mẹ nhé"
                />
                <span>
                  <span className="text-blue-color me-1">Hashtag</span>
                  <strong className="block">#AbbottGrowGold </strong>
                  <strong className="block">#DinhDuongChatLuong </strong>
                  <strong className="block">#ViConLaSo1</strong>
                </span>
              </p>
              <p className="flex items-center  font-bold mb-1 text-sm xl:text-base  ">
                <img
                  className="me-2 w-[30px]"
                  src="/Assets/images/like-icon.png"
                  alt="chia sẻ ảnh bé lớn khôn khác biệt để nhận quà mẹ nhé"
                />
                <span className="text-blue-color me-1">Tag thêm</span>3 người
                bạn
              </p>
            </div>
          </div>
          <div className="absolute top-0 left-0 rounded-b-2xl w-full h-full opacity-60 bg-main-color"></div>
        </div>
        <img
          className="absolute w-[20%] top-[41px] right-[92%] rotate-90 z-10"
          src="/Assets/images/paper-clamp-1.png"
          alt=""
        />
        <img
          className="absolute w-[18%] top-[60px] -right-[9%] z-10 "
          src="/Assets/images/paper-clamp-2.png"
          alt=""
        />
      </div>
      <div className="w-[90%] lg:w-[65%] xl:w-[60%] mx-auto mb-3 relative overflow-hidden">
        <img
          className="absolute w-[33%] top-[49%] left-[41%] -translate-x-1/2 -translate-y-1/2 rotate-[4deg] -z-10"
          src={props.imageSave}
          // src={`/Assets/images/test.png`}
          alt=""
        />
        <img
          src="/Assets/images/thumbnail.png"
          alt="chia sẻ ảnh bé lớn khôn khác biệt để nhận quà mẹ nhé"
        />
      </div>
      <div className="w-[90%] mx-auto flex justify-evenly px-2">
        <button
          className="btn-custom btn-back btn-back-review"
          onClick={props.handleBack}
        >
          Quay lại
        </button>
        <button
          className="btn-custom btn-next btn-next-review"
          onClick={props.handleShareBtn}
        >
          Chia sẻ{" "}
          <img
            className="w-[20px]"
            src="/Assets/images/fb-icon.png"
            alt="Hút sữa sẵn sàng dinh dưỡng cùng Abbott Grow Gold"
          />
        </button>
      </div>
    </>
  );
}
