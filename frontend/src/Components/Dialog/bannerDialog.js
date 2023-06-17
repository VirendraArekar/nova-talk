import React, { useEffect, useState } from "react";

//redux
import { connect, useDispatch, useSelector } from "react-redux";

//MUI
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { Cancel } from "@material-ui/icons";

//types
import { CLOSE_BANNER_DIALOG } from "../../store/banner/types";

//action
import { createNewBanner, editBanner } from "../../store/banner/action";
import { baseURL } from "../../util/serverPath";

const BannerDialog = (props) => {
  const dispatch = useDispatch();

  const { dialog: open, dialogData } = useSelector((state) => state.banner);

  const [mongoId, setMongoId] = useState("");
  const [link, setLink] = useState("");
  const [imageData, setImageData] = useState(null);
  const [imagePath, setImagePath] = useState(null);

  const [errors, setError] = useState({
    image: "",
  });

  useEffect(() => {
    if (dialogData) {
      setMongoId(dialogData._id);
      setLink(dialogData.link);
      setImagePath(baseURL + "/" + dialogData.image);
    }
  }, [dialogData]);

  useEffect(
    () => () => {
      setError({
        image: "",
      });
      setMongoId("");
      setLink("");
      setImageData(null);
      setImagePath(null);
    },
    [open]
  );

  const HandleInputImage = (e) => {
    if (e.target.files[0]) {
      setImageData(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImagePath(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const closePopup = () => {
    dispatch({ type: CLOSE_BANNER_DIALOG });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!mongoId) {
      if (!imageData || !imagePath) {
        return setError({ ...errors, image: "Banner Photo is Required!" });
      }
    } else {
      if (!imageData && !imagePath) {
        return setError({ ...errors, image: "Banner Photo is Required!" });
      }
    }

    const formData = new FormData();

    formData.append("image", imageData);
    formData.append("link", link);
    if (mongoId) {
      props.editBanner(formData, mongoId);
    } else {
      props.createNewBanner(formData);
    }
  };

  return (
    <>
      <Dialog
        open={open}
        aria-labelledby="responsive-dialog-title"
        onClose={closePopup}
        disableBackdropClick
        disableEscapeKeyDown
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle id="responsive-dialog-title" style={{ marginLeft: 20 }}>
          {"Banner"}
        </DialogTitle>

        <IconButton
          style={{
            position: "absolute",
            right: 0,
            color: "#5E72E4",
          }}
        >
          <Tooltip title="Close">
            <Cancel onClick={closePopup} />
          </Tooltip>
        </IconButton>
        <DialogContent>
          <div class="modal-body pt-1 px-1 pb-3">
            <div class="d-flex flex-column text-center">
              <form>
                <div class="form-group">
                  <label class="float-left">Link</label>
                  <input
                    type="text"
                    class="form-control"
                    required=""
                    placeholder="https://www.google.com"
                    value={link}
                    onChange={(e) => {
                      setLink(e.target.value);
                    }}
                  />

                </div>
                <div class="form-group">
                  <label class="float-left">Banner Image</label>
                  <input
                    type="file"
                    class="form-control"
                    accept="image/*"
                    required=""
                    onChange={HandleInputImage}
                  />
                  {errors.image && (
                    <div class="pl-1 text-left">
                      <Typography
                        variant="caption"
                        color="error"
                        style={{ fontFamily: "Circular-Loom" }}
                      >
                        {errors.image}
                      </Typography>
                    </div>
                  )}
                  {imagePath && (
                    <>
                      <img
                        height="100px"
                        width="100px"
                        alt="app"
                        src={imagePath}
                        style={{
                          boxShadow: "0 5px 15px 0 rgb(105 103 103 / 50%)",
                          border: "2px solid #fff",
                          borderRadius: 10,
                          marginTop: 10,
                          float: "left",
                        }}
                      />
                    </>
                  )}
                </div>

                <button
                  type="button"
                  class="btn btn-primary btn-block btn-round"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default connect(null, { createNewBanner, editBanner })(BannerDialog);
