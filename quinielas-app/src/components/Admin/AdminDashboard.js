import React from "react";

export const AdminDashboard = () => {
  return (
    <div className="container-fluid mt-5">
      
      {/*Dashboard*/}
      <div className="row">
      
        <div className="col-sm-4">
          <ul class="list-group">
            <li class="list-group-item d-flex justify-content-between align-items-center">
              Profile
              <span class="badge badge-primary badge-pill">14</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
              Events
              <span class="badge badge-primary badge-pill">2</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
              Messages
              <span class="badge badge-primary badge-pill">1</span>
            </li>
          </ul>
        </div>

        <div className="col-6">
            <h1>The content goes here!</h1>
        </div>

      </div>

      <div className="row mt-5">
         <div className="col-sm-4">
             <h1>More content</h1>
         </div>
      </div>
      
      {/** ---------- */}

   
    </div>
  );
};
