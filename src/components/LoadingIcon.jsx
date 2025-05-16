export default function LoadingIcon({ width }) {
    const loadingIconCSS = {
        width: width,
        height: width,
        borderRadius: width/2,
        backgroundColor: "grey",
        maskImage: "url('./src/assets/loader-icon.png')",
        maskRepeat: "no-repeat",
        maskSize: "100% 100%",
        animation: "rotate 1500ms linear infinite"
        //animation: { name: "rotate", duration: "5s", timingFunction: "linear", iterationCount: "infinite" }
    };

    return (
        <>
            <style>
            {
                `@keyframes rotate {
                    0% {
                        transform: rotate(0deg);
                    }
                    100% {
                        transform: rotate(360deg);
                    }
                }`
            }
            </style>
            <div style={loadingIconCSS} />
        </>
    )
}