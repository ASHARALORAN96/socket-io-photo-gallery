const socket = io();

const socketConnection = {
  instanceV: null,
  get instance() {
    if (!this.instanceV) {
      this.instanceV = io();
    }
    return this.instanceV;
  },
};
const photoSlider = document.querySelector("#photoSlider");

socketConnection.instance.on("renderImg", function (data) {
  photoSlider.style.backgroundImage = `url('../assets/${data}')`;
});
