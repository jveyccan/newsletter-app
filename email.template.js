exports.getContent = async function (heading, content,type) {

    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Newsletter Mail</title>
    </head>
    <body>
    <table cellpadding="0" cellspacing="0" width="100%"  bgcolor="#f4f5f6">
        <tr>
            <td style="border-left:solid 10px #f4f5f6;border-right:solid 10px #f4f5f6;padding: 30px 0; background-color: #f4f5f6">
                <table  border="0" style="border-collapse: collapse;max-width: 600px; margin: 0 auto; font-family: Arial, Tahoma, 'Open Sans',sans-serif;">
                    <tbody>
                    <tr>
                        <td style="height: 160px; padding: 20px;background-color: #7bac7e" bgcolor="#7bac7e" >
                            <table cellpadding="0" cellspacing="0" style="width: 100%">
                                <tr>
                                    <td style="color: #223730;font-size: 30px; font-weight: 600;text-align: center">
                                        <img src="https://localhost:3000/public/examplelogo.png" style="width: 160px">
                                    </td>
                                </tr>
                                <tr>
                                    <td style="color: white;font-size: 20px;text-align: center; padding-top: 20px">
                                        ${heading}
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2" bgcolor="#ffffff" style="background-color: #ffffff">
                            <table>
                                <tbody>
                                <tr>
                                    <td style="color: #6B6D86;font-size: 16px; font-weight: 400;padding: 20px">
                                        ${content}
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
    
                    <tr>
                        <td>
                            <table align="center">
                                <tr>
                                    <td style="margin-top:0px;margin-bottom:6px;text-align:center;font-size: 13px;color: #9c9c9c; padding-top: 30px">
                                        <p>©2020 Newsletter Team</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </table>
    
    </body>
    </html>`;
   

}