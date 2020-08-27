"use strict";

function startRotate() {
    document.getElementsByClassName("circle").item(0).className = "circle start-rotate";
    setTimeout(() => {
        document.getElementsByClassName("circle").item(0).className = "circle start-rotate stop-rotate";
    }, Math.floor(Math.random() * 10000) + 200);
}
