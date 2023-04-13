import '../styles/globals.css'
import {ConfigProvider as CountryPhoneConfigProvider} from 'antd-country-phone-input';
import en from 'world_countries_lists/data/countries/en/world.json';
import 'antd-country-phone-input/dist/index.css';
import 'flagpack/dist/flagpack.css';
import Image from "next/image";

const getFlag = (short) => {
    const data = require(`world_countries_lists/data/flags/24x24/${short.toLowerCase()}.png`);
    // for dumi
    if (typeof data === 'string') {
        return data;
    }
    // for CRA
    return data.default;
};

function MyApp({Component, pageProps}) {
    return <CountryPhoneConfigProvider
        locale={en}
        areaMapper={(area) => {
            return {
                ...area,
                emoji: (
                    <Image
                        alt="flag"
                        style={{width: 18, height: 18, verticalAlign: 'sub'}}
                        src={getFlag(area.short)}
                    />
                ),
            };
        }}

    >
        <Component {...pageProps} />
    </CountryPhoneConfigProvider>
}

export default MyApp
