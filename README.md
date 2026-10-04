# ESA 321 – Finite Element Method
## Interactive FEM Learning Suite

School of Aerospace Engineering, Universiti Sains Malaysia  
Tuanku Syed Sirajuddin Engineering Campus  
Dr. Norizham Abdul Razak

## GitHub Pages deployment
1. Upload **all files in this folder** to the root of a GitHub repository (for example `ESA321-FEM`).
2. In GitHub open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select branch **main** and folder **/(root)**, then save.
5. The site entry page is `index.html`.

## Releasing course modules
Edit only the `true` / `false` values at the top of `course-access.js`.

Current release configuration:
- 1D Bar: released
- 2D Truss: released
- 2D Beam: released
- 2D Frame: locked
- CST: released
- 3D Truss: locked
- 3D Beam: locked

The lock is intended for teaching progression on a static site; it is not password-grade security.
