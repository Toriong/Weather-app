import React from 'react'
import { getTimeOfLocation } from '../timeFns/getTimeOfLocation'
import '../css/comp-css/footer.css'

const Footer = () => {
    const currentYear = getTimeOfLocation('America/Chicago', false, true);
    return (
        <footer id='footer'>
            <div>
                <span>Copyright {currentYear} Gabriel Torion | All rights reserved</span>
            </div>
        </footer>
    )
}

export default Footer