export const validationSingleFile = (
  files: any,
  type = "image",
  isCheckSize = false,
  maxSize = 2 // MB
) => {
  if (files.length == 0) {
    return "Chọn file cần upload";
  } else {
    console.log(files[0]);
    var filename = files[0].name;

    /* getting file extenstion eg- .jpg,.png, etc */
    var extension = filename.substr(filename.lastIndexOf("."));

    /* define allowed file types */
    if (type == "image") {
      var allowedExtensionsRegx = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
    }
    /* testing extension with regular expression */
    var isAllowed = allowedExtensionsRegx.test(extension);

    if (isAllowed) {
      var fileSize = files[0].size;
      /* 1024 = 1MB */
      var size = Math.round(fileSize / 1024);
      /* checking for less than or equals to 2MB file size */
      if (isCheckSize) {
        if (size <= maxSize * 1024) {
          return "";
        } else {
          return `"File có dung lượng nhỏ hơn hoặc bằng ${maxSize} MB`;
        }
      } else {
        return "";
      }
    } else {
      return "File không hợp lệ";
    }
  }
};
