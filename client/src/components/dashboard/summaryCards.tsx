import { Box, Grid, Stack, styled, Typography } from '@mui/material'
import { CurrencyType } from '../../utils/helper'
import { Iconify } from '../Iconify'
import { CurrencyDisplay } from './CurrencyDisplay'

interface ISummaryCardProps {
    /** User's Total Expenses value as decimal */
    userTotalExp: number;
}

export const SummaryCards: React.FunctionComponent<ISummaryCardProps> = ({ userTotalExp }) => {
    const LabelIconStyle = styled('div')(({ theme }) => ({
        borderRadius: 60,
        width: 60,
        height: 60,
    }))
    return (
        <Grid container spacing={2}
            justifyContent={'center'}
            alignItems={'center'}>
             <Grid item xs={12} md={12}> {/*Change md to 4  */}
                <Stack spacing={2} direction='row'
                    sx={{
                        bgcolor: (theme) => theme.palette['primary'].light,
                        borderRadius: 2,
                        p: 3
                    }}>
                    <LabelIconStyle sx={{ bgcolor: (theme) => theme.palette['primary'].dark, py: '18px' }}>
                        <Iconify icon=":nimbus:invoice" sx={{ width: '100%', height: '100%', color: 'white' }} />
                    </LabelIconStyle>
                    <Box>
                        <Typography variant="caption"
                            sx={{ color: (theme) => theme.palette['primary'].dark }}>
                            Total
                        </Typography>
                        <Typography variant="h5"
                            sx={{ color: (theme) => theme.palette['primary'].dark }}>
                            <CurrencyDisplay value={userTotalExp ?? 0} currencyType={CurrencyType.USD} />
                        </Typography>
                    </Box>
                </Stack>
            </Grid>
        </Grid>

    )
}
