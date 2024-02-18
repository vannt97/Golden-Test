import * as React from "react";
import Layout from "../layouts/Layout";
function Play() {
  
  return (
    <Layout>
      <div className="relative">
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
              className="absolute w-[300px] bottom-[30px] -left-[30px] z-0"
              src="/Assets/images/GIRAFFE.png"
              alt="Hút sữa sẵn sàng dinh dưỡng cùng Abbott Grow Gold"
            />
            <p className="absolute bottom-0 left-10 text-white text-2xl">
              (*) Dành cho trẻ bắt đầu vào mẫu giáo
            </p>
            {/* <div
              id="canvas"
              className="w-full h-full bg-black rounded-3xl"
            ></div> */}
            <div id="viewportLayout">
              <canvas id="output_canvas"></canvas>
            </div>
          </div>
        </div>
        <div className="w-[90%] mx-auto flex justify-between px-6">
          <button className="btn-custom btn-back btn-back-step">
            <div></div> Quay lại
          </button>
          <button className="btn-custom btn-next btn-next-step">
            Tiếp tục <div></div>
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default Play;
