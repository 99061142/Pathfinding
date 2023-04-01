import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faHouse, faWeightHanging } from '@fortawesome/free-solid-svg-icons'

function CellIcon({ type = null, weight = null }) {
    if (type === null && weight === null) {
        return null
    }
    if (weight > 1) {
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