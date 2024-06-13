function saveWorkspace() {
    var workspaceName = document.getElementById("workspace-name").value;
    var workspaceType = document.getElementById("workspace-type").value;
    var workspaceDescription = document.getElementById("workspace-description").value;


    

    var workspaceInfoOutput = document.getElementById("workspace-info");
    workspaceInfoOutput.innerHTML = `
        <div class="workspace-info-item">
            <label>Workspace Name:</label>
            <span>${workspaceName}</span>
        </div>
        <div class="workspace-info-item">
            <label>Workspace Type:</label>
            <span>${workspaceType}</span>
        </div>
        <div class="workspace-info-item">
            <label>Workspace Description:</label>
            <span>${workspaceDescription}</span>
        </div>
    `;

    var workspaceForm = document.getElementById("workspace-form");
    var workspaceOutput = document.getElementById("workspace-output");

    workspaceForm.style.display = "none";
    workspaceOutput.style.display = "block";
}

function deleteWorkspace() {
    var workspaceOutput = document.getElementById("workspace-output");
    workspaceOutput.style.display = "none";

    // Optionally, you can reset the form or perform any additional cleanup here
}

function toggleWorkspaceForm() {
    var workspaceForm = document.getElementById("workspace-form");
    var workspaceOutput = document.getElementById("workspace-output");

    if (workspaceForm.style.display === "none") {
        workspaceForm.style.display = "block";
        workspaceOutput.style.display = "none";
    } else {
        workspaceForm.style.display = "none";
    }
}
