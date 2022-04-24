const socket = io();

const socketConnection = {
  instanceValue: null,
  get instance() {
    if (!this.instanceValue) {
      this.instanceValue = io();
    }
    return this.instanceValue;
  },
};
const photoSlider = document.querySelector("#photoSlider");

socketConnection.instance.on("renderImg", function (data) {
  photoSlider.style.backgroundImage = `url('../assets/${data}')`;
});
