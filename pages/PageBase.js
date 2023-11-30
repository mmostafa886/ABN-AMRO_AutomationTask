import {t} from "testcafe";
class PageBase{

    async enterText(field, string){
        await t
        .expect(field.visible)
        .ok();
       await t
        .typeText(field, string, {paste: true});
    }

    async clickOnElement(element){
        await t
        .expect(element.visible)
        .ok();
        await t
        .click(element);
    }

    async  getAttributeValue(element, attributeName) {
        const attributeValue = await element.getAttribute(attributeName);
        return attributeValue;
    }

}

export default PageBase;