import * as React from "react";
import EventManager from "../../Codebase/Base/EventManager";
import { EventType } from "../../Codebase/Types/EventType";

const objects = [
  {
    imgDefault: "Assets/images/balo.png",
    imgHighlight: "Assets/images/balo-highlight-2.png",
    left: 75,
    top: "7%",
    eventType: EventType.BA_LO,
  },
  {
    imgDefault: "Assets/images/non.png",
    imgHighlight: "Assets/images/non-highlight-2.png",
    left: 252,
    top: "25%",
    eventType: EventType.NON,
  },
  {
    imgDefault: "Assets/images/2-hop-sua.png",
    imgHighlight: "Assets/images/2-hop-sua-highlight-2.png",
    left: 410,
    top: "41%",
    eventType: EventType.SUA,
  },
  {
    imgDefault: "Assets/images/binh-nuoc.png",
    imgHighlight: "Assets/images/binh-nuoc-highlight-2.png",
    left: 587,
    top: "59%",
    eventType: EventType.BINH_NUOC,
  },
  {
    imgDefault: "Assets/images/huou-bong.png",
    imgHighlight: "Assets/images/huong-bong-highlight-2.png",
    left: 750,
    top: "76.5%",
    eventType: EventType.HUOU_BONG,
  },
];

function Stage2(props: any) {
  // const [state, setState] = React.useState({
    
  // });

  // React.useEffect(() => {
  //   console.log("hello world", )
  //   // (document.querySelectorAll(".img-stage-2")[2] as HTMLElement).click();
  // }, []);

  const handleClick = (
    event: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    EventManager.Instance.Emit(
      (event.target as HTMLImageElement).dataset.eventType
    );
  };

  const renderObjects = () => {
    return objects.map((item, index) => {
      return (
        <img
          key={index}
          onClick={(e) => {
            document.querySelectorAll(".img-stage-2").forEach((ele) => {
              (ele as HTMLImageElement).src = (
                ele as HTMLElement
              ).dataset.default;

              (ele as HTMLImageElement).style.transform =
                "translateX(-50%) scale(1)";
            });
            (e.target as HTMLImageElement).src = (
              e.target as HTMLImageElement
            ).dataset.highlight;
            (e.target as HTMLImageElement).style.transform =
              "translateX(-50%) scale(1.05)";
            EventManager.Instance.Emit(EventType.ON_CLICK);
            EventManager.Instance.Emit(item.eventType);
            props.handState(item.eventType, true);
          }}
          className="absolute w-[53%]  transition  z-0 img-stage-2"
          style={{ top: item.top, left: "50%", transform: "translateX(-50%)" }}
          src={item.imgDefault}
          data-highlight={item.imgHighlight}
          data-default={item.imgDefault}
          alt="Hút sữa sẵn sàng dinh dưỡng cùng Abbott Grow Gold"
        />
      );
    });
  };
  return (
    <div
      className={`absolute w-[40%] bottom-[50px] -left-3 z-0 ${
        props.stage.step == 2 ? "" : "invisible"
      }`}
    >
      <img
        className=""
        src="Assets/images/cabinet-group.png"
        alt="Hút sữa sẵn sàng dinh dưỡng cùng Abbott Grow Gold"
      />
      {renderObjects()}
      {/* <img
        onMouseLeave={handleMouseOut}
        onMouseEnter={handleHoverObject}
        className="absolute w-[180px]  transition top-[75px] left-[85px] z-0"
        src="Assets/images/balo.png"
        data-highlight="Assets/images/balo-highlight.png"
        data-default="Assets/images/balo.png"
        alt="Hút sữa sẵn sàng dinh dưỡng cùng Abbott Grow Gold"
      />
      <img
        onMouseLeave={handleMouseOut}
        onMouseEnter={handleHoverObject}
        className="absolute w-[180px]   transition top-[252px] left-[85px] z-0"
        src="Assets/images/non.png"
        data-highlight="Assets/images/non-highlight.png"
        data-default="Assets/images/non.png"
        alt="Hút sữa sẵn sàng dinh dưỡng cùng Abbott Grow Gold"
      />
      <img
        onMouseLeave={handleMouseOut}
        onMouseEnter={handleHoverObject}
        className="absolute w-[180px]   transition top-[410px] left-[85px] z-0"
        src="Assets/images/2-hop-sua.png"
        data-highlight="Assets/images/2-hop-sua-highlight.png"
        data-default="Assets/images/2-hop-sua.png"
        alt="Hút sữa sẵn sàng dinh dưỡng cùng Abbott Grow Gold"
      />
      <img
        onMouseLeave={handleMouseOut}
        onMouseEnter={handleHoverObject}
        className="absolute w-[180px]   transition top-[587px] left-[85px] z-0"
        src="Assets/images/binh-nuoc.png"
        data-default="Assets/images/binh-nuoc.png"
        data-highlight="Assets/images/binh-nuoc-highlight.png"
        alt="Hút sữa sẵn sàng dinh dưỡng cùng Abbott Grow Gold"
      />
      <img
        onMouseLeave={handleMouseOut}
        onMouseEnter={handleHoverObject}
        className="absolute w-[180px]   transition top-[750px] left-[85px] z-0"
        src="Assets/images/huou-bong.png"
        data-default="Assets/images/huou-bong.png"
        data-highlight="Assets/images/huou-bong-highlight.png"
        alt="Hút sữa sẵn sàng dinh dưỡng cùng Abbott Grow Gold"
      /> */}
    </div>
  );
}

export default Stage2;
