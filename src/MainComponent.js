import Grid from '@mui/material/Grid2';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
/*import PrayerImage from './PrayerImgs.js'*/



export default function MainContent() {

    return (
        <>
     
            {/* top row*/}
            <Grid container spacing={2} style={{color:'#fff'} } >

                    <Grid size={6} xs={6} >
                        <div>
                            <h2>سبتمر 07/04/2024 | 4:25</h2>
                            <h1>مكة المكرمة</h1>
                        </div>

                    </Grid>

                    <Grid size={6}>

                        <h2>متبقي بتنيتبمنبتينبحتى صلاة العصر</h2>
                        <h1> 1:30:15</h1>

                    </Grid>
            
            </Grid>
            {/* top row*/}

            <Divider style={{ borderColor: "#fff",opacity:'0.1' }} />

         
            <h2 style={{ color: 'red', fontSize: '500px' }}>jfjf</h2>
          
        </>

    )
}

{/* <Stack direction="row" spacing={2}>
            
              
            </Stack>
*/}