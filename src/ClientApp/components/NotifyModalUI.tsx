import * as React from "react";

function NotifyModalUI(props: any) {
  let render: any = "";
  if (props.isLoading || props.error || props.errorName) {
    render = (
      <>
        <div className="backdrop" />
        <div className="notify-modal">
          {(props.error || props.errorName) && (
            <div className="notify-modal__close" onClick={props.onClose}></div>
          )}
          {props.isLoading && (
            <div>
              <h2> Mẹ chờ xí nhé </h2>
              <div className="loader-api">
                <span className="loader-api__element"></span>
                <span className="loader-api__element"></span>
                <span className="loader-api__element"></span>
              </div>
            </div>
          )}
          {props.error && (
            <div>
              <h2> Oops có lỗi hệ thống...</h2>
              <p style={{ marginBottom: 0, fontSize: "1.2rem" }}>
                Vui lòng thử lại sau
              </p>
            </div>
          )}
          {props.errorName && (
            <div>
              <h2> Thông báo</h2>
              <p style={{ marginBottom: 0, fontSize: "1.2rem" }}>
                {props.errorName == "default"
                  ? "Vui lòng thử lại sau"
                  : props.errorName}
              </p>
            </div>
          )}
        </div>
      </>
    );
  }
  return <>{render}</>;
}

export default React.memo(NotifyModalUI);
