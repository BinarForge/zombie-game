/// <reference path="../node_modules/@types/pixi.js/index.d.ts" />

interface IKey{
  code: number;
  isDown: boolean;
  isUp: boolean;
  press: () => void;
  release: () => void;
  downHandler: () => void;
  upHandler: () => void;
}

export function keyboard(keyCode: number): IKey {
  var key: IKey = {
    code: keyCode,
    isDown: false,
    isUp: true,
    press: undefined,
    release: undefined,
    downHandler: undefined,
    upHandler: undefined
  };
  //The `downHandler`
  var downHandler = function(event) {
    if (event.keyCode === key.code) {
      if (key.isUp && key.press) key.press();
      key.isDown = true;
      key.isUp = false;
    }
    event.preventDefault();
  };

  //The `upHandler`
  var upHandler = function(event) {
    if (event.keyCode === key.code) {
      if (key.isDown && key.release) key.release();
      key.isDown = false;
      key.isUp = true;
    }
    event.preventDefault();
  };

  //Attach event listeners
  window.addEventListener(
    "keydown", downHandler.bind(key), false
  );
  window.addEventListener(
    "keyup", upHandler.bind(key), false
  );
  return key;
}