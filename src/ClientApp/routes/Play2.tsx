import * as React from "react";
import Layout from "../layouts/Layout";
import { useNavigate } from "react-router-dom";

function Play2() {
  const navigate = useNavigate();
  const handleNext = () => {
    navigate("/step-3")
  }

  const handleBack = () => {
    navigate("/")
  }
  return (
    <Layout>
      <div className="relative">
        <p className="mb-20 relative text-4xl leading-relaxed w-3/4 mx-auto font-black text-center text-blue-color uppercase ">
          Chọn vật dụng đi mẫu giáo mà bé{" "}
          <span className="relative">
            thích nhất
            <img
              className="absolute top-[100%] left-[0px]"
              src="/Assets/images/border-text.png"
              alt="Hút sữa sẵn sàng dinh dưỡng cùng Abbott Grow Gold"
            />
          </span>{" "}
          nha!
        </p>
        <img
          className="absolute -top-[50px] left-0"
          src="/Assets/images/element-group.png"
          alt="Hút sữa sẵn sàng dinh dưỡng cùng Abbott Grow Gold"
        />

        <div className=" relative mb-10">
          <img
            className="absolute -top-[130px] left-0 z-10"
            src="/Assets/images/label.png"
            alt="Hút sữa sẵn sàng dinh dưỡng cùng Abbott Grow Gold"
          />
          <img
            className="absolute bottom-[300px] right-0 z-10"
            src="/Assets/images/book1.png"
            alt="Hút sữa sẵn sàng dinh dưỡng cùng Abbott Grow Gold"
          />
          <img
            className="absolute -bottom-[10px] right-0 z-10"
            src="/Assets/images/toy.png"
            alt="Hút sữa sẵn sàng dinh dưỡng cùng Abbott Grow Gold"
          />
          <div id="canvas-wrapper">
            <img
              className="absolute -bottom-10 -left-6 z-0"
              src="/Assets/images/yard.png"
              alt="Hút sữa sẵn sàng dinh dưỡng cùng Abbott Grow Gold"
            />
            <img
              className="absolute w-[400px] bottom-[50px] -left-3 z-0"
              src="/Assets/images/cabinet-group.png"
              alt="Hút sữa sẵn sàng dinh dưỡng cùng Abbott Grow Gold"
            />
            <p className="absolute bottom-0 left-10 text-white text-2xl">
              (*) Dành cho trẻ bắt đầu vào mẫu giáo
            </p>
            <div
              id="canvas"
              className="w-full h-full bg-black rounded-3xl"
            ></div>
            {/* <div id="viewportLayout">
              <canvas id="output_canvas"></canvas>
            </div> */}
          </div>
        </div>
        <div className="w-[90%] mx-auto flex justify-between px-6">
          <button className="btn-custom btn-back btn-back-step" onClick={handleBack}>
            <div></div> Quay lại
          </button>
          <button className="btn-custom btn-next btn-next-step" onClick={handleNext}>
            Tiếp tục <div></div>
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default Play2;
