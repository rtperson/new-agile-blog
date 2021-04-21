import * as chai from "chai";
import * as Layout from "./Layout";

const expect = chai.expect;

const layout = Layout;

describe("Layout of Blog", () => {
    it("should show the title of the blog", () => {
        //Get the title of the blog
        const title = layout.title;
        expect(title).to.equal(
            "Gathering Agility",
            "Title Gathering Agility is not present in layout",
        );
    });
});
