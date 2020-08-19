
/**
 * 彩色的控制台，方便调试
 * @content [params ] content 控制台显示的参数
 * @param [string ] hint 提示信息
 * @param [color] color 颜色值
 * @param 是否是fe文档 fe | other
 */
export default function sncConsole(content, hint, color = "primary", env = 'fe') {
    const defaultColor = {
        primary: "#1890ff",
        success: "#52c41a",
        warning: "#faad14",
        error: "#f5222d",
        coral: "#FF7F50",
        fuchsia: "#FF00FF",
        seagreen: "#2E8B57",
        violet: "#EE82EE",
        darkblue: "#00008B",
        red: "#B03060",
        orange: "#FE9A76",
        yellow: "#FFD700",
        pink: "#FF1493",
        olive: "#32CD32",
        teal: "#008080",
        blue: "#0E6EB8",
        green: "#016936",
        purple: "#B413EC",
        brown: "#A52A2A",
        gray: "#A0A0A0",
        black: "#000000",
    };
    const isDefaultColor = Object.keys(defaultColor).indexOf(color) >= 0;
    if (!isDefaultColor) {
        defaultColor[color] = color;
    }
    const envColor = env === "other" ? "#D2691E" : env === "fe" ? "#00CED1" : "#000000";
    const envTag = `%c${env}`;
    const envStyle = `
        vertical-align: middle;
        display: flex;
        height: 100%;
        line-height: 1.5;
        background: ${envColor}; 
        color: white; 
        border-radius: 3px 0 0 3px; 
        font-size: 14px; 
        padding: 0 5px;
        box-sizing: border-box;
        background-clip: border-box;
    `;
    const hintContent = `%c${hint}`;
    const hintStyle = `
        vertical-align: middle;
        display: flex;
        height: 100%;
        line-height: 1.5;
        background: ${defaultColor[color]}; 
        color: white; 
        padding: 0 4px;
        border-radius: 0 3px 3px 0; 
        font-size: 14px; 
        box-sizing: border-box;
        background-clip: border-box;
    `;
    console.log(`${envTag}${hintContent}`, `${envStyle}`, `${hintStyle}`, content);
}