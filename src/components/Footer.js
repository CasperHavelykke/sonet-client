import React from 'react';
import { Grid } from 'semantic-ui-react';


function Footer() {

    return(
        <Grid.Row className="footer" style={{marginBottom: 40}}>
            <p>
                Contact: havelykke@outlook.com <br/>
                &copy; 2020 Casper Havelykke
            </p>
        </Grid.Row> 
    )
}

export default Footer;