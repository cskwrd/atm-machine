import { Link, Typography } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';


export default function Copyright() {

  return (
    <Typography mt="-2" variant="body2" style={{ textAlign: "center" }} sx={{ color: 'text.secondary'}}>
            &copy; ATM Machine | Open Source &nbsp; 
            <FavoriteIcon  color="error"  sx={{ fontSize: 18 ,mb:'-2px', ml:'-5px' }}/><br/>
            <Link variant="subtitle2" component={'a'} href="https://github.com/cskwrd/atm-machine" target="_blank">
            [GitHub]
            </Link>
          </Typography>
  )
}
