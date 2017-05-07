export class Keyboard{

  public static Space = 32;
  public static Up = 38;
  public static Down = 40;
  public static Left = 37;
  public static Right = 39;

  _keyState: { [key: number] : boolean; } = {};

  constructor(){
    this._keyState = {};
    window.addEventListener("keydown", this.downHandler.bind(this), false);
    window.addEventListener("keyup", this.upHandler.bind(this), false);
  }

  protected downHandler(e){
    this._keyState[e.keyCode] = true;
  }

  protected upHandler(e){
    this._keyState[e.keyCode] = false;
  }

  public getState(key: number): boolean{
    return this._keyState[key];
  }
}