
import { Grid } from '@mui/material';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';

const Logout = () => {

    return (
        <MainCard>
            <Grid container spacing={gridSpacing}>
                Profile 
            </Grid>
        </MainCard>
    );
};

export default Logout;
