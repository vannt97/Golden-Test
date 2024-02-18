import * as React from "react";
import Layout from "../layouts/Layout";
import { useNavigate } from "react-router-dom";

function Play4CauTruot() {
  const navigate = useNavigate();
  const handleShareBtn = () => {
    navigate("/review");
  };
  return (
    <Layout>
      <div className="relative">
        <p className="mb-20 relative z-20 text-4xl leading-relaxed mx-auto font-black text-center text-blue-color uppercase ">
          Bé hãy tạo dáng cao lớn, thông minh sẵn sàng đến trường theo cách
          riêng nha!
          <img
            className="absolute top-[90%] right-[160px]"
            src="Assets/images/border-text-2.png"
            alt="Hút sữa sẵn sàng dinh dưỡng cùng Abbott Grow Gold"
          />
        </p>
        <img
          className="absolute -top-[50px] left-0"
          src="Assets/images/element-group.png"
          alt="Hút sữa sẵn sàng dinh dưỡng cùng Abbott Grow Gold"
        />

        <div className=" relative mb-10">
          <img
            className="absolute -top-[60px] left-0 z-10"
            src="Assets/images/label-2.png"
            alt="Hút sữa sẵn sàng dinh dưỡng cùng Abbott Grow Gold"
          />
          <img
            className="absolute bottom-[300px] right-0 z-10"
            src="Assets/images/book1.png"
            alt="Hút sữa sẵn sàng dinh dưỡng cùng Abbott Grow Gold"
          />

          <div id="canvas-wrapper">
            <img
              className="absolute -bottom-10 -left-6 z-0"
              src="Assets/images/yard.png"
              alt="Hút sữa sẵn sàng dinh dưỡng cùng Abbott Grow Gold"
            />

            <img
              className="absolute w-full top-0 left-0 z-0"
              src="Assets/images/play4-bong-ro.png"
              alt="Hút sữa sẵn sàng dinh dưỡng cùng Abbott Grow Gold"
            />
            <div
              id="canvas"
              className="w-full h-full bg-black rounded-3xl"
            ></div>
          </div>
        </div>
        <div className="w-[90%] mx-auto flex justify-between px-6 items-center">
          <button className="btn-custom btn-back">
            <img
              className="w-[38px]"
              src="Assets/images/upload-icon.png"
              alt="Hút sữa sẵn sàng dinh dưỡng cùng Abbott Grow Gold"
            />{" "}
            Up Ảnh
          </button>
          <div className="relative">
            <img
              src="Assets/images/camera-icon.png"
              alt="Hút sữa sẵn sàng dinh dưỡng cùng Abbott Grow Gold"
            />
            <p className="absolute top-[100%] left-[50%] -translate-x-1/2 text-red-color text-4xl font-black w-full text-center whitespace-nowrap ">
              Chụp lại
            </p>
          </div>
          <button onClick={handleShareBtn} className="btn-custom btn-next">
            Chia sẻ{" "}
            <img
              src="Assets/images/fb-icon.png"
              alt="Hút sữa sẵn sàng dinh dưỡng cùng Abbott Grow Gold"
            />
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default Play4CauTruot;
