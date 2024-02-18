import { Text, preloadFont } from 'troika-three-text';
export default class FontManager
{
    constructor ()
    {
        preloadFont(
            {
                font: './Assets/Fonts/BreeSerif.otf',
                characters: '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ01234567789'
            },
            () =>
            {
                console.log("Preload font succeed");
            });
    }
    /**
     *
     * @param {*} text
     * @param {*} color
     * @param {*} callback
     * @param {*} fontSize
     */
    CreateText2D (text, color, callback, fontSize = 0.2)
    {
        // Create:
        let myText = new Text();
        myText.font = "./Assets/Fonts/BreeSerif.otf";
        // Set properties to configure:
        myText.text = text;
        myText.fontSize = fontSize;
        myText.anchorX = "50%";
        myText.anchorY = "50%";
        myText.color = color;
        // myText.letterSpace = 0.01;
        // Update the rendering:
        myText.sync(() =>
        {
            callback(myText);
        });
    }
}
