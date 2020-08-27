import * as chai from 'chai';
import * as wheel from './wheel';

const expect = chai.expect;

describe("Spinning Wheel", () => {
    beforeEach(() => {
        const div = document.createElement("div");
        div.setAttribute("class", "circle");
        document.body.appendChild(div);
    });

    it("should start with a classname of circle", () => {
        const el = document.getElementsByClassName("circle");
        expect(el[0].className).to.equal("circle");
    });

    it("should change classname to 'circle start-rotate' on click", () => {
        wheel.startRotate();
        const el = document.getElementsByClassName("circle");
        expect(el[0].className).to.equal("circle start-rotate");
    });
});
