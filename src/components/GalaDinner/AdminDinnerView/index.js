import React, { useEffect, useState } from "react";
import "./style.scss"; // تأكد من إضافة SCSS هنا
import axios from "axios";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import CustomFormWrapper from "../../../CoreComponent/CustomFormWrapper";
import { Drawer, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { CloseRounded } from "@mui/icons-material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { DataGrid } from "@mui/x-data-grid";



const SpeakerTable = () => {
  const BaseUrl = process.env.REACT_APP_BASE_URL;

  const [speakers, setSpeakers] = useState([]);
  const [selectedSpeaker, setSelectedSpeaker] = useState({});
  // const [selectedUser, setSelectedUser] = useState({});

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const { conferenceId } = useParams();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  const openMenu = (event, row) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const closeMenu = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  useEffect(() => {
    const fetchSpeakers = async () => {
      try {
        const response = await axios.get(
          `${BaseUrl}/dinner/attendees/${conferenceId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSpeakers(response.data.data);
        console.log(response.data.data);
        const speakers = response.data.data
      } catch (error) {
        // toast.success("no speakers data");
      } finally {
        setLoading(false);
      }
    };

    fetchSpeakers();
  }, [token, conferenceId]);

  const openModal = (speaker) => {
    setSelectedSpeaker(speaker);
    console.log(selectedSpeaker);

    console.log(speaker);
    setModalIsOpen(true);

  };
  const columns = [
    {
      field: "companion_name",
      headerName: "Companion Name",
      flex: 1,
      minWidth: 230,
      cellClassName: "centered-cell",
    },
    {
      field: "companion_price",
      headerName: "Companion Price",
      flex: 1,
      minWidth: 230,
      cellClassName: "centered-cell",

    },

    {
      field: "companion_Status",
      headerName: "Companion status",
      flex: 1,
      minWidth: 230,
      cellClassName: "centered-cell",

    },



    {
      field: "actions",
      headerName: "Actions",
      flex: 0.2,
      minWidth: 90,
      cellClassName: "centered-cell",
      renderCell: (params) => (
        <>
          <IconButton onClick={(event) => openMenu(event, params.row)}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl) && selectedRow?.id === params.row.id}
            onClose={closeMenu}
          >
            <MenuItem
              onClick={() => openModal(params.row.speaker)}

            >
              view
            </MenuItem>

          </Menu>
        </>
      ),
    },
  ];
  const rows = speakers.map((row) => {
    return {

      conference_id: row.conference_id,
      companion_name: row.companion_name,
      companion_price: row.companion_price,
      companion_Status: row.status,

      actions: row.actions,
      speaker: row.speaker,
    };
  });




  return (

    <div className="speaker-table">
      <Typography
        variant="h6"
        sx={{
          color: '#c62828',
          fontWeight: 'bold',
          fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
          textAlign: 'center',
        }}
      >Dinner Speakers List</Typography>

      {loading ? (
        <div>Loading...</div>
      ) : speakers.length === 0 ? (
        <div>No speakers available</div> // Show this when there are no speakers
      ) : (
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(row) => row.conference_id}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 8,
              },
            },
          }}
          pageSizeOptions={[8]}
          checkboxSelection
          disableRowSelectionOnClick
          autoHeight
          sx={{
            marginTop: "20px",
            "& .MuiDataGrid-virtualScroller": {
              overflow: "hidden", // لإزالة أي تمرير غير مرغوب فيه
            },
          }}
        />
      )}

      <Drawer
        anchor="right"
        sx={{
          //width
          zIndex: (theme) => theme.zIndex.modal + 1, // Ensure it's above modals and other high-priority elements

          '& .MuiDrawer-paper': {
            zIndex: (theme) => theme.zIndex.modal + 1,


            width:
            {
              xs: '100%',
              sm: '50%',
              md: '40%',
              lg: '30%',
              xl: '30%',
            },
          },

        }}

        open={modalIsOpen} onClose={() => setModalIsOpen(false)}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            padding: 2,
          }}
        >
          <IconButton onClick={() => setModalIsOpen(false)}>
            <CloseRounded />
          </IconButton>
        </div>
        <CustomFormWrapper
          title="Speaker Details"
          noActions={true}
        >
          {selectedSpeaker && (
            <div className="modal-content9">
                         <p>
                <strong>Name:</strong>
                {speakers[0]?.user?.name}
              </p>
              <p>
                <strong>Email:</strong>{" "}
                {speakers[0]?.user?.email}
              </p>
              <p>
                <strong>Phone Number:</strong>{" "}
                {speakers[0]?.user?.phone_number}
              </p>
              <p>
                <strong>WhatsApp Number:</strong>{" "}
                {speakers[0]?.user?.whatsapp_number}
              </p>
              <p>
                <strong>Topics:</strong> {selectedSpeaker.topics || "N/A"}
              </p>
              <p>
                <strong>Online Participation:</strong>{" "}
                {selectedSpeaker.online_participation ? "Yes" : "No"}
              </p>
              <p>
                <strong>Is Online Approved:</strong>{" "}
                {selectedSpeaker.is_online_approved ? "Yes" : "No"}
              </p>
              <p>
                <strong>Accommodation Status:</strong>{" "}
                {selectedSpeaker.accommodation_status ? "Yes" : "No"}
              </p>
              <p>
                <strong>Ticket Status:</strong>{" "}
                {selectedSpeaker.ticket_status ? "Active" : "Inactive"}
              </p>
              <p>
                <strong>Dinner Invitation:</strong>{" "}
                {selectedSpeaker.dinner_invitation ? "Yes" : "No"}
              </p>
              <p>
                <strong>Airport Pickup:</strong>{" "}
                {selectedSpeaker.airport_pickup ? "Yes" : "No"}
              </p>
              <p>
                <strong>Free Trip:</strong>{" "}
                {selectedSpeaker.free_trip ? "Yes" : "No"}
              </p>
       
            </div>
          )}
        </CustomFormWrapper>
      </Drawer>
    </div>
  );
};

SpeakerTable.propTypes = {
  speakers: PropTypes.array,
};

export default SpeakerTable;
