/**
 *  m= 4, n = 4
    [
    0 = [{ "1,1": "0" }, { "1,2": "0" }, { "1,3": "0" }, { "1,4": "1" }],
    1 = [{ "2,1": "0" }, { "2,2": "0" }, { "2,3": "0" }, { "2,4": "0" }],
    2 = [{ "3,1": "0" }, { "3,2": "0" }, { "3,3": "0" }, { "3,4": "0" }],
    3 = [{ "4,1": "0" }, { "4,2": "0" }, { "4,3": "0" }, { "4,4": "0" }]
    ] 
   */

const rooms = () => [
  [
    { "1,1": "0", hasLight: false },
    { "1,2": "0", hasLight: false },
    { "1,3": "0", hasLight: false },
    { "1,4": "1", hasLight: false }
  ],
  [
    { "2,1": "0", hasLight: false },
    { "2,2": "0", hasLight: false },
    { "2,3": "0", hasLight: false },
    { "2,4": "0", hasLight: false }
  ],
  [
    { "3,1": "0", hasLight: false },
    { "3,2": "0", hasLight: false },
    { "3,3": "0", hasLight: false },
    { "3,4": "0", hasLight: false }
  ],
  [
    { "4,1": "0", hasLight: false },
    { "4,2": "0", hasLight: false },
    { "4,3": "0", hasLight: false },
    { "4,4": "0", hasLight: false }
  ]
];

const HTML = () => `
<!DOCTYPE html>
<html lang="en">
   <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet'>
      <title>Document</title>
      <style type="text/css">
         table,td {
         border-collapse: collapse;
         border: 0.1em solid black;
         }    
      </style>
      <tbody>
         <table>
            <tr>
               <td style="background-color: black">&#9788;</td>
               <td style="background-color: yellow;">&#9788;</td>
               <td style="background-color: white; 
                  color:white;">&#9788;</td>
               <td style="background-color: black">&#9788;</td>
            </tr>
            <tr>
               <td style="background-color: white; color:white;">&#9788;</td>
               <td style="background-color: white; color:white;">&#9788;</td>
               <td style="background-color: white; color:white;">&#9788;</td>
               <td style="background-color: yellow;">&#9788;</td>
            </tr>
            <tr>
               <td style="background-color: yellow;">&#9788;</td>
               <td style="background-color: white; 
                  color:white;">&#9788;</td>
               <td style="background-color: white; color:white;">&#9788;</td>
               <td style="background-color: white; color:white;">&#9788;</td>
            </tr>
            <tr>
               <td style="background-color: white; color:white;">&#9788;</td>
               <td style="background-color: black">&#9788;</td>
               <td style="background-color: white; color:white;">&#9788;</td>
               <td style="background-color: black">&#9788;</td>
            </tr>
         </table>
</html>
`;

module.exports = { rooms, HTML };
