import {Table, TableRow, TableBody, TableCell, TableHead, Paper} from "@mui/material";

function MyTable(){
    return (
        <Paper>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Equipment</TableCell>
                        <TableCell>Taken by</TableCell>
                        <TableCell>Subject</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>Canon EOS 6D Mark II</TableCell>
                        <TableCell>Joe</TableCell>
                        <TableCell>Tree</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Canon EOS 6D Mark II</TableCell>
                        <TableCell>Joe</TableCell>
                        <TableCell>House</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Pentax K-70</TableCell>
                        <TableCell>Mark</TableCell>
                        <TableCell>Old lady</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Paper>
    );
}

export default MyTable;