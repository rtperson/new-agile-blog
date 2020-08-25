import * as chai from 'chai';
import * as wheel from './wheel';

const assert = chai.assert;
const expect = chai.expect;

describe("Spinning Wheel", () => {
    beforeEach(() => {
        var div = document.createElement("div");
        div.setAttribute("class", "circle");
        document.body.appendChild(div);
        console.log(div);
    });

    it("should start with a classname of circle", () => {
        var el = document.firstElementChild;
        expect(el.className).to.equal("circle");
    });

    it("should change classname to 'circle start-rotate' on click", () => {
        // var el = document.getElementsByClassName('circle').item(0);
        // wheel.startRotate();
        // expect(el.className).to.equal("circle start-rotate");
    });
});
