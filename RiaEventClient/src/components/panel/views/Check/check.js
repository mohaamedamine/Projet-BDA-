import React, { useState, useRef } from "react";
import {
  Container,
  Card,
  CardContent,
  makeStyles,
  Grid,
  Button,
} from "@material-ui/core";
import QrReader from "react-qr-reader";
import Navbar from "../../Navbar/Navbar";
import axios from "axios";
import swal from "sweetalert";
//function concatenate(state){

//}
function Check() {
  //const [text, setText] = useState('');
  //const [imageUrl, setImageUrl] = useState('');
  const [scanResultFile, setScanResultFile] = useState("");
  const [scanResultWebCam, setScanResultWebCam] = useState("");
  const classes = useStyles();
  const qrRef = useRef(null);

  const handleErrorFile = (error) => {
    console.log(error);
  };
  const handleScanFile = (result) => {
    if (result) {
      setScanResultFile(result);
    }
  };
  const onScanFile = () => {
    qrRef.current.openImageDialog();
  };
  const handleErrorWebCam = (error) => {
    console.log(error);
  };
  const handleScanWebCam = (result) => {
    if (result) {
      setScanResultWebCam(result);
    }
  };

  React.useEffect(() => {
    if (scanResultWebCam.length)
      axios
        .post(
          {
            url: "http://localhost:5000/graphql",
            method: "post",
            data: {
              query: `mutation   checkGuest($qrData:String!) {

   checkGuest(qrData:$qrData)
  }
    
    `,
              variables: { qrData: scanResultWebCam },
            },
          },
          scanResultWebCam
        )
        .then((result) => {
          if (result.data === "Invited") alert("invited");
        })
        .catch((err) => console.error(err));
  }, [scanResultWebCam]);

  return (
    <>
      <Navbar />

      <Container>
        <Card>
          <CardContent>
            <Grid container spacing={20}>
              <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                <Button
                  className={classes.btn}
                  variant="contained"
                  onClick={onScanFile}
                >
                  Scan Qr Code
                </Button>

                <QrReader
                  ref={qrRef}
                  delay={300}
                  style={{ width: "100%" }}
                  onError={handleErrorFile}
                  onScan={handleScanFile}
                  legacyMode
                />
                <h3>Scanned Code: {scanResultFile}</h3>
                <Button
                  style={{ color: "#008003", backgroundColor: "#0000" }}
                  onClick={() => {
                    console.log("checking");
                    console.log(scanResultFile);
                    axios({
                      url: "http://localhost:5000/graphql",
                      method: "post",
                      data: {
                        query: `mutation   checkGuest($qrData:String!) {

   checkGuest(qrData:$qrData)
  }
    
    `,
                        variables: {
                          qrData: scanResultFile,
                        },
                      },
                    })
                      .then((result) => {
                        console.log(result.data);
                        if (result.data.data.checkGuest === "Invited")
                          swal("Guest invited");
                        else {
                          swal("Guest not invited");
                        }
                      })

                      .catch((err) => console.error(err));
                  }}
                >
                  Verify✓
                </Button>
              </Grid>

              <Grid spacing={3} item xl={10} lg={6} md={12} sm={12} xs={14}>
                <h3>Scan With camera</h3>
                <QrReader
                  delay={300}
                  style={{ width: "100%" }}
                  onError={handleErrorWebCam}
                  onScan={handleScanWebCam}
                />
                <h3>Scanned Code: {scanResultWebCam}</h3>
                <Button
                  style={{ color: "#008003", backgroundColor: "#0000" }}
                  onClick={() => {
                    console.log("checking");
                    console.log(scanResultFile);
                    axios({
                      url: "http://localhost:5000/graphql",
                      method: "post",
                      data: {
                        query: `mutation   checkGuest($qrData:String!) {

   checkGuest(qrData:$qrData)
  }
    
    `,
                        variables: {
                          qrData: scanResultWebCam,
                        },
                      },
                    })
                      .then((result) => {
                        console.log(result.data);
                        if (result.data.data.checkGuest === "Invited")
                          swal("Guest invited");
                        else {
                          swal("Guest not invited");
                        }
                      })

                      .catch((err) => console.error(err));
                  }}
                >
                  Verify ✓
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 10,
  },

  btn: {
    marginTop: 10,
    marginBottom: 20,
  },
}));
export default Check;
