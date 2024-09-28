import { Modal, Button } from "react-bootstrap";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { uploadCoverPhoto } from "../services/uploadService";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { PrimaryContext } from "../../primary";

const ChangeCoverPhotoModal = ({
  show,
  setShowModal,
}: {
  show: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const { me, setMe } = useContext(PrimaryContext);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { mutate: changeCoverPhoto } = useMutation({
    mutationFn: uploadCoverPhoto,
    onError: (error) => toast.error(error.message),
    onSuccess: ({ url }) => {
      setMe({ ...me, coverPhoto: url });
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleSave = () => {
    changeCoverPhoto(selectedFile as File);
    setShowModal(false);
  };

  return (
    <Modal show={show} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Upload a cover profile picture</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          id="filePhoto"
          type="file"
          name="filePhoto"
          onChange={handleFileChange}
        />
        <div className="imagePreviewContainer">
          {selectedFile && (
            <img
              id="imagePreview"
              src={URL.createObjectURL(selectedFile)}
              alt="Selected Profile"
              style={{ maxWidth: "100%", marginTop: "10px" }}
            />
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleSave}
          disabled={selectedFile ? false : true}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ChangeCoverPhotoModal;
