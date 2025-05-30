import "../Components/Pagination.css";
import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


const Paginating = ({size, totalPost, paginate, currentPage}) => {
    // console.log(pageMap);

    // num of pages needed
    const maxPages = Math.ceil(totalPost/size);
    
    return (
        <div className="paginationContainer">
            <h1>Pagination Container</h1>
            <Stack spacing={2}>
                <Pagination count={maxPages} siblingCount={2} color="secondary" page={currentPage} onChange={(event, pageNum) => paginate(pageNum)}/>
            </Stack>
        </div>
    );
}

export default Paginating;