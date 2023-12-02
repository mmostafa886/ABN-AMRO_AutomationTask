/**
 * The 'PageBase' class represents the base for the app pages (in case there are several pages & hence several page classes, all of them will extend this class)
 * it contains all the main functionlaties that may need to be taken on a single element (enterText, clcikOnElement, ......)
 * These actions may be taken on single element but they are a little bit complex in nature 
 * (Ex. clcikOnElement >> the element needs to be visible first before we can perform the click action)
 */
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