import RestoreUtil from "./restoreUtil";
import OtherUtil from "../otherUtil";

var Dropbox = (window as any).Dropbox;

class DropboxUitl {
  static UploadFile(
    file: any,
    handleFinish: () => void,
    showMessage: (message: string) => void
  ) {
    var ACCESS_TOKEN = OtherUtil.getReaderConfig("dropbox_token") || "";
    let year = new Date().getFullYear(),
      month = new Date().getMonth() + 1,
      day = new Date().getDate();
    var dbx = new Dropbox.Dropbox({ accessToken: ACCESS_TOKEN });
    dbx
      .filesUpload({
        path: "/Apps/KoodoReader/data.zip",
        contents: file,
        mode: { ".tag": "overwrite" },
      })
      .then(function (response: any) {
        console.log(response, "上传成功");
        dbx
          .filesUpload({
            path:
              "/Apps/KoodoReader/" +
              `${year}-${month <= 9 ? "0" + month : month}-${
                day <= 9 ? "0" + day : day
              }.zip`,
            contents: file,
            mode: { ".tag": "overwrite" },
          })
          .then(function (response: any) {
            console.log(response, "上传成功");
            handleFinish();
          })
          .catch(function (error: any) {
            console.error(error, "上传失败");
            showMessage("Upload failed, check your connection");
          });
      })
      .catch(function (error: any) {
        console.error(error, "上传失败");
        showMessage("Upload failed, check your connection");
      });
    return false;
  }
  static DownloadFile(
    handleFinish: (mobileData: string) => void,
    showMessage: (message: string) => void,
    isSync: boolean = false
  ) {
    var ACCESS_TOKEN = OtherUtil.getReaderConfig("dropbox_token") || "";
    var dbx = new Dropbox.Dropbox({ accessToken: ACCESS_TOKEN });
    dbx
      .filesDownload({
        path: isSync
          ? "/Apps/KoodoReader/config.zip"
          : "/Apps/KoodoReader/data.zip",
      })
      .then(function (data: any) {
        let file = data.fileBlob;
        file.lastModifiedDate = new Date();
        file.name = "data.zip";
        RestoreUtil.restore(file, handleFinish, isSync);
      })
      .catch(function (error: any) {
        showMessage("Download failed,network problem or no backup");

        console.error(error);
      });

    return false;
  }
}

export default DropboxUitl;
