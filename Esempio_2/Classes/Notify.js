export class Notify {
  constructor() {}


  sendNotification(type, text, side) {
    $().message({
      type: type, //'success', 'warning', 'danger', 'info' 
      html: text,
      position: side,
    });
  }

  success(text, side) {
    this.sendNotification("success", `${text}`, `top-${side}`);
    console.info("SUCCESS sendNotification " + text)
  }

  error(text, side) {
    this.sendNotification("danger", `${text}`, `top-${side}`);
    console.error(`${text}`);
  }

}