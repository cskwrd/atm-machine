import { convertToCurrency, currencyFind, CurrencyType } from "../../utils/helper";


interface ICurrencyDisplayProps {
    /** currency value as decimal */
    value: number;

    currencyType: CurrencyType;
}

export const CurrencyDisplay: React.FunctionComponent<ICurrencyDisplayProps> = ({ value, currencyType }) => {
    return <>{currencyFind(currencyType)} {convertToCurrency(value)}</>
}