import React, { useEffect, useState } from "react";
import { Button, Container, Form, Image, Nav, Navbar } from "react-bootstrap";
import { addDoc, collection } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, storage } from "../firebase";
import { signOut } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export default function PostPageAdd() {
  const [user, loading] = useAuthState(auth);
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState(
    "https://zca.sg/img/placeholder"
  );
  const navigate = useNavigate();

  async function addPost() {
    // Reserves a spot in firebase storage for a file upload.
    // File is in images folder, name being image.name
    const imageReference = ref(storage, `images/${image.name}`);

    // Upload file to spot reserved in firebase storage
    const response = await uploadBytes(imageReference, image);

    // Get URL for file uploaded in order for access
    const imageUrl = await getDownloadURL(response.ref);

    // Add document to cloud firestore
    await addDoc(collection(db, "posts"), {
        caption, image: imageUrl, imageName: image.name
    });
    navigate("/");
  }

  // Ensure only logged in users can add a post
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/login");
  }, [navigate, user, loading]);

  return (
    <>
      <Navbar variant="light" bg="light">
        <Container>
          <Navbar.Brand href="/">Tinkergram</Navbar.Brand>
          <Nav>
            <Nav.Link href="/add">New Post</Nav.Link>
            <Nav.Link onClick={() => signOut(auth)}>🚪</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Container>
        <h1 style={{ marginBlock: "1rem" }}>Add Post</h1>
        <Form>
          <Form.Group className="mb-3" controlId="caption">
            <Form.Label>Caption</Form.Label>
            <Form.Control
              type="text"
              placeholder="Lovely day"
              value={caption}
              onChange={(text) => setCaption(text.target.value)}
            />
          </Form.Group>
          <Image
            src={previewImage}
            style={{
                objectFit: "cover", // alternative option is contain
                width: "10rem",
                height: "10rem",
            }}
          />
          <Form.Group className="mb-3" controlId="image">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              onChangeCapture={(e) => {
                if (e.target.files.length === 0) return;
                const imageFile = e.target.files[0]; // 'e' refers to event
                const previewImage = URL.createObjectURL(imageFile);
                setImage(imageFile);
                setPreviewImage(previewImage);
              }}
            />
          </Form.Group>
          <Button variant="primary" onClick={async (e) => addPost()}>
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
}