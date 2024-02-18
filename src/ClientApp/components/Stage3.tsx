import * as React from "react";
import EventManager from "../../Codebase/Base/EventManager";
import { EventType } from "../../Codebase/Types/EventType";

export const btnsMonHocHighLight = [
  {
    top: "17.5%",
    left: "19%",
    with: "18%",
    url: "Assets/images/so-highlight.png",
    pathImage: "Assets/images/play4-dem-so.png",
    eventType: EventType.DIEM_SO,
    gif: {
      url: "Assets/gif/text-new.gif",
      top: "0",
      left: "0",
    },
  },
  {
    top: "28.5%",
    left: "19%",
    with: "18%",
    url: "Assets/images/chu-highlight.png",
    pathImage: "Assets/images/play4-chu.png",
    eventType: EventType.CHU_CAI,
    gif: {
      url: "Assets/gif/text-new.gif",
      top: "0",
      left: "0",
    },
  },
  {
    top: "40%",
    left: "18.5%",
    with: "18%",
    url: "Assets/images/ve-highlight.png",
    pathImage: "Assets/images/play4-ve.png",
    eventType: EventType.CLEAR_ITEM_STAGE_3,
    gif: {
      url: "Assets/gif/ve.gif",
      top: "-26%",
      left: "0",
    },
  },
  {
    top: "51.3%",
    left: "18.5%",
    with: "18%",
    url: "Assets/images/hat-highlight.png",
    pathImage: "Assets/images/play4-hat.png",
    pathImageCutout: "Assets/images/play4-hat-cutout.png",
    eventType: EventType.CLEAR_ITEM_STAGE_3,
    gif: {
      url: "Assets/gif/text-new.gif",
      top: "0",
      left: "0",
    },
    imageAnimations: [
      {
        url: "Assets/images/play4-hat-1.png",
        top: "26%",
        left: "1%",
        width: "10%",
      },
      {
        url: "Assets/images/play4-hat-2.png",
        top: "14%",
        left: "55%",
        width: "32%",
      },
      {
        url: "Assets/images/play4-hat-3.png",
        top: "20%",
        left: "17%",
        width: "22%",
      },
    ],
  },
];

export const btnsTroChoiHighLight = [
  {
    top: "17.5%",
    right: "18%",
    with: "19%",
    url: "Assets/images/bong-ro-highlight.png",
    pathImage: "Assets/images/play4-bong-ro.png",
    pathImageCutout: "Assets/images/play4-bong-ro-cutout.png",
    eventType: EventType.CLEAR_ITEM_STAGE_3,
    gif: {
      url: "Assets/gif/bongro.gif",
      top: "-20%",
      left: "-3%",
    },
  },
  {
    top: "28.7%",
    right: "18.6%",
    with: "18%",
    url: "Assets/images/cau-truot-highlight.png",
    pathImage: "Assets/images/play4-cau-tuot.png",
    pathImageCutout: "Assets/images/play4-cau-tuot-cutout.png",
    eventType: EventType.CLEAR_ITEM_STAGE_3,
    gif: {
      url: "Assets/gif/text-new.gif",
      top: "0",
      left: "0",
    },
    imageAnimations: [
      {
        url: "Assets/images/play4-cau-tuot-1.png",
        top: "30%",
        left: "-34%",
        width: "94%",
      },
    ],
  },
  {
    top: "40.1%",
    right: "18.2%",
    with: "18.5%",
    url: "Assets/images/thu-nhun-highlight.png",
    pathImage: "Assets/images/play4-thu-nhun.png",
    pathImageCutout: "Assets/images/play4-thu-nhun-cutout.png",
    eventType: EventType.CLEAR_ITEM_STAGE_3,
    imageAnimations: [
      {
        url: "Assets/images/play4-thu-nhun-1.png",
        top: "55%",
        left: "0%",
        width: "43%",
      },
    ],
    gif: {
      url: "Assets/gif/text-new.gif",
      top: "0",
      left: "0",
    },
  },
  {
    top: "51%",
    right: "17%",
    with: "20%",

    url: "Assets/images/xich-du-highlight.png",
    pathImage: "Assets/images/play4-xich-du.png",
    pathImageCutout: "Assets/images/play4-xich-du-cutout.png",
    eventType: EventType.CLEAR_ITEM_STAGE_3,
    gif: {
      url: "Assets/gif/text-new.gif",
      top: "0",
      left: "0",
    },
    imageAnimations: [
      {
        url: "Assets/images/play4-xich-du-1.png",
        top: "49%",
        left: "-13%",
        width: "50%",
      },
    ],
  },
];

export default function Stage3(props: any) {
  const handleMouseOut = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    (e.target as HTMLImageElement).style.opacity = "0";
  };

  const handleCLick = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>,
    item: any
  ) => {
    EventManager.Instance.Emit(EventType.ON_CLICK);

    document.querySelectorAll(".img-stage-3").forEach((ele) => {
      (ele as HTMLImageElement).style.opacity = "0";
    });
    (e.target as HTMLImageElement).style.opacity = "1";
    EventManager.Instance.Emit(item.eventType);
    props.handlePathImageActive({
      ...props.stage,
      pathImageActive: item.pathImage,
      pathGifActive: item.gif,
      imageAnimations: item.imageAnimations ? item.imageAnimations : [],
      isAuthStep3: true,
      pathImageCutOutActive: item.pathImageCutout,
    });
  };
  const renderBtnsMonHocHighlight = () => {
    return btnsMonHocHighLight.map((item, index) => {
      return (
        <img
          key={index}
          // onMouseEnter={handleHoverObject}
          // onMouseLeave={handleMouseOut}
          onClick={(e) => {
            handleCLick(e, item);
          }}
          className="absolute  z-20 img-stage-3"
          style={{
            top: item.top,
            left: item.left,
            width: item.with,
            opacity: 0,
          }}
          src={item.url}
          alt="Hút sữa sẵn sàng dinh dưỡng cùng Abbott Grow Gold"
        />
      );
    });
  };

  const renderBtnsTroChoiHighlight = () => {
    return btnsTroChoiHighLight.map((item, index) => {
      return (
        <img
          // onMouseEnter={handleHoverObject}
          // onMouseLeave={handleMouseOut}
          key={index}
          onClick={(e) => {
            handleCLick(e, item);
          }}
          className="absolute z-20 img-stage-3"
          style={{
            top: item.top,
            right: item.right,
            width: item.with,
            opacity: 0,
          }}
          src={item.url}
          alt="Hút sữa sẵn sàng dinh dưỡng cùng Abbott Grow Gold"
        />
      );
    });
  };

  return (
    <>
      <img
        className="absolute w-[24%] top-[13%] left-[15%] z-10"
        src="Assets/images/mon-hoc.png"
        alt="Hút sữa sẵn sàng dinh dưỡng cùng Abbott Grow Gold"
      />
      <img
        className="absolute w-[24%] top-[13%] right-[15%] z-10"
        src="Assets/images/tro-choi.png"
        alt="Hút sữa sẵn sàng dinh dưỡng cùng Abbott Grow Gold"
      />
      {props.stage.pathImageActive ? (
        <img
          className="absolute w-full top-0 left-0 z-0"
          src={props.stage.pathImageActive}
          alt="Hút sữa sẵn sàng dinh dưỡng cùng Abbott Grow Gold"
        />
      ) : (
        ""
      )}
      {renderBtnsMonHocHighlight()}
      {renderBtnsTroChoiHighlight()}
      {/* {renderBtnsMonHoc()}
      {renderBtnsTroChoi()} */}
    </>
  );
}
