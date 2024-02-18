import * as React from "react";
import Layout from "../layouts/Layout";
import { useNavigate } from "react-router-dom";
const btnsMonHoc = [
  {
    top: 150,
    left: 100,
    path: "/mon-hoc-dem-so",
  },
  {
    top: 270,
    left: 100,
    path: "/mon-hoc-chu",
  },
  {
    top: 400,
    left: 100,
    path: "/mon-hoc-ve",
  },
  {
    top: 530,
    left: 100,
    path: "/mon-hoc-hat",
  },
];

const btnsTroChoi = [
  {
    top: 150,
    right: 100,
    path: "/tro-choi-bong-ro",
  },
  {
    top: 270,
    right: 100,
    path: "/tro-choi-cau-truot",
  },
  {
    top: 400,
    right: 100,
    path: "/tro-choi-thu-nhun",
  },
  {
    top: 530,
    right: 100,
    path: "/tro-choi-xich-du",
  },
];
function Play3() {
  const navigate = useNavigate();
  const [sceneActive, setSceneActive] = React.useState("/mon-hoc-dem-so");
  const handleBack = () => {
    navigate("/step-2");
  };

  const handleNext = () => {
    navigate(sceneActive);
  };
  const renderBtnsMonHoc = () => {
    return btnsMonHoc.map((item, index) => {
      return (
        <button
          onClick={() => {
            handleClickBtns(item.path);
          }}
          key={index}
          style={{
            top: item.top,
            left: item.left,
          }}
          className={`absolute w-[130px] h-[100px]  `}
        ></button>
      );
    });
  };
  const renderBtnsTroChoi = () => {
    return btnsTroChoi.map((item, index) => {
      return (
        <button
          onClick={() => {
            handleClickBtns(item.path);
          }}
          style={{
            top: item.top,
            right: item.right,
          }}
          key={index}
          className={`absolute w-[130px] h-[100px]  `}
        ></button>
      );
    });
  };
  const handleClickBtns = (path: string) => {
    console.log("click btns");
    setSceneActive(path);
    document.querySelector(".btn-next").classList.remove("active");
    void document.querySelector(".btn-next").clientWidth;
    document.querySelector(".btn-next").classList.add("active");
  };
  return (
    <Layout>
      <div className="relative">
        <p className="mb-20 relative text-4xl leading-relaxed w-3/4 mx-auto font-black text-center text-blue-color uppercase ">
          Chọn 1 môn học & 1 trò chơi bé{" "}
          <span className="relative">
            thích nhất
            <img
              className="absolute top-[100%] left-[0px]"
              src="/Assets/images/border-text.png"
              alt="Hút sữa sẵn sàng dinh dưỡng cùng Abbott Grow Gold"
            />
          </span>{" "}
          ở mẫu giáo nha!
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
              className="absolute w-[200px] top-[80px] left-14 z-0"
              src="/Assets/images/mon-hoc.png"
              alt="Hút sữa sẵn sàng dinh dưỡng cùng Abbott Grow Gold"
            />
            <img
              className="absolute w-[200px] top-[80px] right-14 z-0"
              src="/Assets/images/tro-choi.png"
              alt="Hút sữa sẵn sàng dinh dưỡng cùng Abbott Grow Gold"
            />
            {renderBtnsMonHoc()}
            {renderBtnsTroChoi()}

            <p className="absolute bottom-0 left-10 text-white text-2xl">
              (*) Dành cho trẻ bắt đầu vào mẫu giáo
            </p>
            <div
              id="canvas"
              className="w-full h-full bg-black rounded-3xl"
            ></div>
          </div>
        </div>
        <div className="w-[90%] mx-auto flex justify-between px-6">
          <button
            className="btn-custom btn-back btn-back-step"
            onClick={handleBack}
          >
            <div></div> Quay lại
          </button>
          <button
            className="btn-custom btn-next btn-next-step "
            onClick={handleNext}
          >
            Tiếp tục <div></div>
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default Play3;
