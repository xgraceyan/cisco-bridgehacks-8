import React from "react";

export default function TeamCodeModal({ teamName, code }) {
  return (
    <div
      class="modal fade"
      id="teamCodeModal"
      tabindex="-1"
      aria-labelledby="teamCodeModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">
              Team Code for {teamName}
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">{code}</div>
        </div>
      </div>
    </div>
  );
}
