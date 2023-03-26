import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faHouse, faWeightHanging } from '@fortawesome/free-solid-svg-icons'

function CellIcon({ type = '', weight = 1 }) {
    if ((type === '' && weight === 1)) {
        return null
    }
    if (weight > 1 && type === '') {
        type = "weight";
    }

    const ICONS = {
        "start": faArrowRight,
        "end": faHouse,
        "weight": faWeightHanging
    };
    const ICON = ICONS[type];

    if (!ICON) { return null }
    return <FontAwesomeIcon icon={ICON} />
}

export default CellIcon;