import { Skeleton } from "@mui/material";

/* 

skeleton for when the words are loading.
when on screen a warning pops in the console.
this is ok and known issue. its a react bug - 
https://stackoverflow.com/questions/41974428/disable-workaround-react-key-requirement 

*/

const skeletonLoaderArray = Array(5).fill(
  <Skeleton
    sx={{ backgroundColor: "#505050", margin: "10px", height: "30px" }}
  />
);
skeletonLoaderArray[skeletonLoaderArray.length - 1] = (
  <Skeleton
    sx={{
      backgroundColor: "#505050",
      margin: "10px",
      height: "30px",
      width: "30%",
    }}
  />
);

export default skeletonLoaderArray;
