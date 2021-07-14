function loadHTMLPreview (jsonData) {
    if (jsonData.Screens && jsonData.Screens.length > 0) {
        for (let i = 0; i < jsonData.Screens.length; i++) {
            $("#main-container").append("<div class='card card-custom hd-mt-4' id='" + jsonData.Screens[i].NavLink + "-form'><div class='card-header'><h3 class='card-title'>" + jsonData.Screens[i].Title + "</h3></div><!--begin::Form--><form class='form' id='" + jsonData.Screens[i].NavLink + "-main-form'><div class='card-body' id='" + jsonData.Screens[i].NavLink + "-body'></div></form><!--end::Form--></div>");
            let cardBody = $("#main-container").find("#" + jsonData.Screens[i].NavLink + "-body");

            if (jsonData.Screens[i].Sections && jsonData.Screens[i].Sections.length > 0) {
                for (let j = 0; j < jsonData.Screens[i].Sections.length; j++) {
                    switch (jsonData.Screens[i].Sections[j].layout) {
                        case "full":
                            switch (jsonData.Screens[i].Sections[j].type) {
                                case "HTML_P":
                                    renderHtmlP(jsonData.Screens[i].Sections[j].layout, null, jsonData, i, j, null, null, cardBody);
                                    break;
                                case "multiple_rows":
                                    cardBody.append("<div class='form-group mt-5' id='" + jsonData.Screens[i].NavLink + "-" + j + "-form-tag'></div>");
                                    if (jsonData.Screens[i].Sections[j].rows && jsonData.Screens[i].Sections[j].rows.length > 0) {
                                        let formTag = cardBody.find("#" + jsonData.Screens[i].NavLink + "-" + j + "-form-tag");
                                        for (let k = 0; k < jsonData.Screens[i].Sections[j].rows.length; k++) {
                                            switch (jsonData.Screens[i].Sections[j].rows[k].type) {
                                                case "HTML_P":
                                                    renderHtmlP(jsonData.Screens[i].Sections[j].layout, jsonData.Screens[i].Sections[j].type, jsonData, i, j, k, null, null, formTag);
                                                    break;
                                                case "HTML_SPAN":
                                                    renderHtmlSpan(jsonData.Screens[i].Sections[j].layout, jsonData.Screens[i].Sections[j].type, jsonData, i, j, k, formTag);
                                                    break;
                                                case "radio-list":
                                                    renderRadioList(jsonData.Screens[i].Sections[j].layout, jsonData.Screens[i].Sections[j].type, jsonData, i, j, k, null, formTag);
                                                    break;
                                                case "radio":
                                                    renderRadio(jsonData.Screens[i].Sections[j].layout, jsonData.Screens[i].Sections[j].type, jsonData, i, j, k, null, formTag);
                                                    break;
                                                default:
                                                    break;
                                            }
                                        }
                                    }
                                    break;
                                case "HTML_ROW":
                                    cardBody.append("<div class='row'>" + jsonData.Screens[i].Sections[j].text + "</div>");
                                    break;
                                case "button":
                                    if (jsonData.Screens[i].Sections[j].isLight)
                                        cardBody.append("<button class='btn btn-light-site'>" + jsonData.Screens[i].Sections[j].text + "</button>");
                                    else if (jsonData.Screens[i].Sections[j].isSite)
                                        cardBody.append("<button class='btn btn-site'>" + jsonData.Screens[i].Sections[j].text + "</button>");
                                    else
                                        cardBody.append("<button class='btn btn-secondary'>" + jsonData.Screens[i].Sections[j].text + "</button>");
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case "two_columns":
                            if (jsonData.Screens[i].Sections[j].columns && jsonData.Screens[i].Sections[j].columns.length > 0) {
                                if (jsonData.Screens[i].Sections[j].columns[0].isRemoveMarginBottom)
                                    cardBody.append("<div class='form-group' style='margin-bottom:0px;'><div class='row' id='" + jsonData.Screens[i].NavLink + "-" + j + "-controls-row'></div></div>");
                                else
                                    cardBody.append("<div class='form-group'><div class='row' id='" + jsonData.Screens[i].NavLink + "-" + j + "-controls-row'></div></div>");
                                let controlsRow = cardBody.find("#" + jsonData.Screens[i].NavLink + "-" + j + "-controls-row");
                                if (jsonData.Screens[i].Sections[j].columns[0].left_column && jsonData.Screens[i].Sections[j].columns[0].left_column.length > 0) {
                                    for (let k = 0; k < jsonData.Screens[i].Sections[j].columns[0].left_column.length; k++) {
                                        switch (jsonData.Screens[i].Sections[j].columns[0].left_column[k].layout) {
                                            case "full":
                                                switch (jsonData.Screens[i].Sections[j].columns[0].left_column[k].type) {
                                                    case "label":
                                                        renderLabel(jsonData.Screens[i].Sections[j].layout, jsonData.Screens[i].Sections[j].columns[0].left_column[k].layout, jsonData, i, j, k, null, controlsRow);
                                                        break;
                                                    default:
                                                        break;
                                                }
                                                break;
                                            default:
                                                break;
                                        }
                                    }
                                }
                                if (jsonData.Screens[i].Sections[j].columns[0].right_column && jsonData.Screens[i].Sections[j].columns[0].right_column.length > 0) {
                                    for (let k = 0; k < jsonData.Screens[i].Sections[j].columns[0].right_column.length; k++) {
                                        switch (jsonData.Screens[i].Sections[j].columns[0].right_column[k].layout) {
                                            case "three_columns":
                                                if (jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns && jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns.length > 0) {
                                                    controlsRow.append("<div class='col-md-9'><div class='row' id='" + jsonData.Screens[i].NavLink + "-" + j + "-" + k + "-row'></div></div>");
                                                    let row = controlsRow.find("#" + jsonData.Screens[i].NavLink + "-" + j + "-" + k + "-row");
                                                    for (let l = 0; l < jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns.length; l++) {
                                                        row.append("<div class='col-md-4' id='" + jsonData.Screens[i].NavLink + "-" + j + "-" + k + "-" + l + "-col'></div>");
                                                        let col = row.find("#" + jsonData.Screens[i].NavLink + "-" + j + "-" + k + "-" + l + "-col");
                                                        if (jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].top_column) {
                                                            switch (jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].top_column.type) {
                                                                case "label":
                                                                    renderLabel(jsonData.Screens[i].Sections[j].layout, jsonData.Screens[i].Sections[j].columns[0].right_column[k].layout, jsonData, i, j, k, l, null, col);
                                                                    break;
                                                                default:
                                                                    break;
                                                            }
                                                        }
                                                        if (jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].bottom_column) {
                                                            switch (jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].bottom_column.type) {
                                                                case "input":
                                                                    renderInput(jsonData.Screens[i].Sections[j].layout, jsonData.Screens[i].Sections[j].columns[0].right_column[k].layout, jsonData, i, j, k, l, col);
                                                                    break;
                                                                case "select":
                                                                    renderSelect(jsonData.Screens[i].Sections[j].layout, jsonData.Screens[i].Sections[j].columns[0].right_column[k].layout, jsonData, i, j, k, l, col);
                                                                    break;
                                                                case "HTML_P":
                                                                    col.append("<p>" + jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].bottom_column.text + "</p>")
                                                                    break;
                                                                case "icon_input":
                                                                    col.append("<div class='input-group hd-mt-2'><div class='input-group-prepend'><span class='input-group-text'>" + jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].bottom_column.front_icon + "</span></div><input type='text' class='form-control' id='" + jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].bottom_column.name + j + "-" + k + "-" + l + "' aria-label='Amount (to the nearest dollar)'><div class='input-group-append'><span class='input-group-text'>" + jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].bottom_column.back_icon + "</span></div></div>");
                                                                    let addedInput = col.find("#" + jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].bottom_column.name + j + "-" + k + "-" + l);
                                                                    if (jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].bottom_column.required)
                                                                        addedInput.attr("required", "required");
                                                                    if (jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].bottom_column.placeholder)
                                                                        addedInput.attr("placeholder", jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].bottom_column.placeholder);
                                                                    break;
                                                                default:
                                                                    break;
                                                            }

                                                        }
                                                    }
                                                }
                                                break;
                                            case "simple_text":
                                                controlsRow.append("<div class='col-md-9'>" + jsonData.Screens[i].Sections[j].columns[0].right_column[k].text + "</div>");
                                                break;
                                            case "two_columns":
                                                if (jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns && jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns.length > 0) {
                                                    controlsRow.append("<div class='col-md-9'><div class='row' id='" + jsonData.Screens[i].NavLink + "-" + j + "-" + k + "-row'></div></div>");
                                                    let row = controlsRow.find("#" + jsonData.Screens[i].NavLink + "-" + j + "-" + k + "-row");
                                                    for (let l = 0; l < jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns.length; l++) {
                                                        switch (jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].type) {
                                                            case "select":
                                                                renderSelect(jsonData.Screens[i].Sections[j].layout, jsonData.Screens[i].Sections[j].columns[0].right_column[k].layout, jsonData, i, j, k, l, null, row);
                                                                break;
                                                            case "input_number":
                                                                row.append("<div class='col-md-4' id='" + jsonData.Screens[i].NavLink + "-" + j + "-" + k + "-" + l + "-col'></div>");
                                                                let colInput = row.find("#" + jsonData.Screens[i].NavLink + "-" + j + "-" + k + "-" + l + "-col");
                                                                colInput.append("<input type='number' class='form-control' id='" + jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].name + j + "-" + k + "-" + l + "'>");
                                                                let addedInput = colInput.find("#" + jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].name + j + "-" + k + "-" + l);
                                                                if (jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].required)
                                                                    addedInput.attr("required", "required");
                                                                if (jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].placeholder)
                                                                    addedInput.attr("placeholder", jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].placeholder);
                                                                break;
                                                            case "HTML_Three_Col_SPAN":
                                                                row.append("<div class='col-md-3 d-flex align-items-center hd-mt-2'><span class='text-site font-weight-bold'>" + jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].text + "</span></div>");
                                                                break;
                                                            case "HTML_Four_Col_SPAN":
                                                                row.append("<div class='col-md-4 d-flex align-items-center hd-mt-2'><span class=''>" + jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].text + "</span></div>");
                                                                break;
                                                            default:
                                                                break;
                                                        }
                                                    }
                                                }
                                                break;
                                            case "full":
                                                if (jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns && jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns.length > 0) {
                                                    controlsRow.append("<div class='col-md-9' id='" + jsonData.Screens[i].NavLink + "-" + j + "-" + k + "-main-col'></div>");
                                                    let mainCol = $("#" + jsonData.Screens[i].NavLink + "-" + j + "-" + k + "-main-col");
                                                    for (let l = 0; l < jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns.length; l++) {
                                                        switch (jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].type) {
                                                            case "HTML_P":
                                                                renderHtmlP(jsonData.Screens[i].Sections[j].layout, jsonData.Screens[i].Sections[j].columns[0].right_column[k].layout, jsonData, i, j, k, l, null, null, mainCol);
                                                                break;
                                                            case "radio":
                                                                renderRadio(jsonData.Screens[i].Sections[j].layout, jsonData.Screens[i].Sections[j].columns[0].right_column[k].layout,
                                                                    jsonData, i, j, k, l, null, mainCol);
                                                                break;
                                                            case "radio-list":
                                                                renderRadioList(jsonData.Screens[i].Sections[j].layout, jsonData.Screens[i].Sections[j].columns[0].right_column[k].layout,
                                                                    jsonData, i, j, k, l, null, mainCol);
                                                                break;
                                                            case "button":
                                                                if (jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].isLight)
                                                                    mainCol.append("<button class='btn btn-light-site'>" + jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].text + "</button>");
                                                                else if (jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].isSite)
                                                                    mainCol.append("<button class='btn btn-site'>" + jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].text + "</button>");
                                                                else
                                                                    mainCol.append("<button class='btn btn-secondary'>" + jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].text + "</button>");
                                                                break;
                                                            case "textarea":
                                                                mainCol.append("<textarea class='form-control' name='" + jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].name + "' id='" + jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].name + "-" + j + "-" + k + "-" + l + "'></textarea>");
                                                                let addedTextArea = mainCol.find("#" + jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].name + "-" + j + "-" + k + "-" + l);
                                                                if (jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].required)
                                                                    addedTextArea.attr("required", "required");
                                                                if (jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].placeholder)
                                                                    addedTextArea.attr("placeholder", jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].placeholder);
                                                                if (jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].cols)
                                                                    addedTextArea.attr("cols", jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].cols);
                                                                if (jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].rows)
                                                                    addedTextArea.attr("rows", jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].rows);
                                                                break;
                                                            default:
                                                                break;
                                                        }
                                                    }
                                                }
                                                break;
                                            case "one_column":
                                                if (jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns && jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns.length > 0) {
                                                    controlsRow.append("<div class='col-md-9'><div class='row' id='" + jsonData.Screens[i].NavLink + "-" + j + "-" + k + "-row'></div></div>");
                                                    let row = controlsRow.find("#" + jsonData.Screens[i].NavLink + "-" + j + "-" + k + "-row");
                                                    for (let l = 0; l < jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns.length; l++) {
                                                        switch (jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].type) {
                                                            case "select":
                                                                renderSelect(jsonData.Screens[i].Sections[j].layout, jsonData.Screens[i].Sections[j].columns[0].right_column[k].layout, jsonData, i, j, k, l, null, row);
                                                                break;
                                                            case "icon_input":
                                                                renderIconInput(jsonData.Screens[i].Sections[j].layout, jsonData.Screens[i].Sections[j].columns[0].right_column[k].layout, jsonData, i, j, k, l, row, null);
                                                                break;
                                                            default:
                                                                break;
                                                        }
                                                    }
                                                }
                                                break;
                                            case "two_full_columns":
                                                if (jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns && jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns.length > 0) {
                                                    controlsRow.append("<div class='col-md-9'><div class='row' id='" + jsonData.Screens[i].NavLink + "-" + j + "-" + k + "-row'></div></div>");
                                                    let row = controlsRow.find("#" + jsonData.Screens[i].NavLink + "-" + j + "-" + k + "-row");
                                                    for (let l = 0; l < jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns.length; l++) {
                                                        row.append("<div class='col-md-6' id='" + jsonData.Screens[i].NavLink + "-" + j + "-" + k + "-" + l + "-col'></div>");
                                                        let col = row.find("#" + jsonData.Screens[i].NavLink + "-" + j + "-" + k + "-" + l + "-col");
                                                        if (jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].top_column) {
                                                            switch (jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].top_column.type) {
                                                                case "label":
                                                                    renderLabel(jsonData.Screens[i].Sections[j].layout, jsonData.Screens[i].Sections[j].columns[0].right_column[k].layout, jsonData, i, j, k, l, null, col);
                                                                    break;
                                                                default:
                                                                    break;
                                                            }
                                                        }
                                                        if (jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].bottom_column) {
                                                            switch (jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].bottom_column.type) {
                                                                case "input":
                                                                    renderInput(jsonData.Screens[i].Sections[j].layout, jsonData.Screens[i].Sections[j].columns[0].right_column[k].layout, jsonData, i, j, k, l, col);
                                                                    break;
                                                                case "select":
                                                                    renderSelect(jsonData.Screens[i].Sections[j].layout, jsonData.Screens[i].Sections[j].columns[0].right_column[k].layout, jsonData, i, j, k, l, col);
                                                                    break;
                                                                default:
                                                                    break;
                                                            }

                                                        }
                                                    }
                                                }
                                                break;
                                            default:
                                                break;
                                        }
                                    }
                                }

                            }
                            break;
                        case "two-cols":
                            if (jsonData.Screens[i].Sections[j].columns && jsonData.Screens[i].Sections[j].columns.length > 0) {
                                cardBody.append("<div class='form-group'><div class='row' id='" + jsonData.Screens[i].NavLink + "-" + j + "-controls-row'></div></div>");
                                let controlsRow = cardBody.find("#" + jsonData.Screens[i].NavLink + "-" + j + "-controls-row");
                                for (let k = 0; k < jsonData.Screens[i].Sections[j].columns.length; k++) {
                                    switch (jsonData.Screens[i].Sections[j].columns[k].type) {
                                        case "HTML_SPAN":
                                            renderHtmlSpan(jsonData.Screens[i].Sections[j].layout, null, jsonData, i, j, k, null, controlsRow);
                                            break;
                                        case "textarea":
                                            controlsRow.append("<div class='col-md-6'><textarea class='form-control hd-mt-2' name='" + jsonData.Screens[i].Sections[j].columns[k].name + "' id='" + jsonData.Screens[i].Sections[j].columns[k].name + "-" + j + "-" + k + "'></textarea></div>");
                                            let addedTextArea = controlsRow.find("#" + jsonData.Screens[i].Sections[j].columns[k].name + "-" + j + "-" + k);
                                            if (jsonData.Screens[i].Sections[j].columns[k].required)
                                                addedTextArea.attr("required", "required");
                                            if (jsonData.Screens[i].Sections[j].columns[k].placeholder)
                                                addedTextArea.attr("placeholder", jsonData.Screens[i].Sections[j].columns[k].placeholder);
                                            if (jsonData.Screens[i].Sections[j].columns[k].cols)
                                                addedTextArea.attr("cols", jsonData.Screens[i].Sections[j].columns[k].cols);
                                            if (jsonData.Screens[i].Sections[j].columns[k].rows)
                                                addedTextArea.attr("rows", jsonData.Screens[i].Sections[j].columns[k].rows);
                                            break;
                                        case "input":
                                            renderInput(jsonData.Screens[i].Sections[j].layout, null, jsonData, i, j, k, null, null, controlsRow);
                                            break;
                                        case "icon_input":
                                            renderIconInput(jsonData.Screens[i].Sections[j].layout, null, jsonData, i, j, k, null, null, controlsRow);
                                            break;
                                        default:
                                            break;
                                    }
                                }
                            }
                            break;
                        case "table":
                            cardBody.append("<div class='form-group'><table class='table table-bordered table-striped table-responsive' id='" + jsonData.Screens[i].NavLink + "-" + j + "-table'></table></div>");
                            let table = cardBody.find("#" + jsonData.Screens[i].NavLink + "-" + j + "-table");
                            if (jsonData.Screens[i].Sections[j].columns && jsonData.Screens[i].Sections[j].columns.length > 0) {
                                table.append("<thead class='site-table-thead'><tr id='" + jsonData.Screens[i].NavLink + "-" + j + "-head-row'></tr></thead>");
                                let headRow = table.find("#" + jsonData.Screens[i].NavLink + "-" + j + "-head-row");
                                for (let k = 0; k < jsonData.Screens[i].Sections[j].columns.length; k++) {
                                    headRow.append("<th scope='col'>" + jsonData.Screens[i].Sections[j].columns[k].title + "</th>");
                                }
                            }
                            if (jsonData.Screens[i].Sections[j].rows && jsonData.Screens[i].Sections[j].rows.length > 0) {
                                table.append("<tbody id='" + jsonData.Screens[i].NavLink + "-" + j + "-body'></tbody>");
                                let body = table.find("#" + jsonData.Screens[i].NavLink + "-" + j + "-body");
                                for (let k = 0; k < jsonData.Screens[i].Sections[j].rows.length; k++) {
                                    body.append("<tr id='" + jsonData.Screens[i].NavLink + "-" + j + "-" + k + "-body-row'></tr>");
                                    let bodyRow = table.find("#" + jsonData.Screens[i].NavLink + "-" + j + "-" + k + "-body-row");
                                    if (jsonData.Screens[i].Sections[j].rows[k].data && jsonData.Screens[i].Sections[j].rows[k].data.length > 0) {
                                        for (let l = 0; l < jsonData.Screens[i].Sections[j].rows[k].data.length; l++) {
                                            switch (jsonData.Screens[i].Sections[j].rows[k].data[l].type) {
                                                case "checkbox":
                                                    bodyRow.append("<td><label class='checkbox checkbox-site'><input type='checkbox' name='" + jsonData.Screens[i].Sections[j].rows[k].data[l].name + "'><span></span></label></td>");
                                                    break;
                                                case "text":
                                                    if (jsonData.Screens[i].Sections[j].rows[k].data[l].isBold)
                                                        bodyRow.append("<th scope='row'>" + jsonData.Screens[i].Sections[j].rows[k].data[l].text + "</th>");
                                                    else
                                                        bodyRow.append("<td>" + jsonData.Screens[i].Sections[j].rows[k].data[l].text + "</td>");
                                                    break;
                                                default:
                                                    break;
                                            }
                                        }
                                    }
                                }
                            }
                            break;
                        case "table_advance":
                            cardBody.append("<div class='row align-items-center'><div class='col-md-12 mb-5'><div class='table-responsive'><table class='table table-striped' id='" + jsonData.Screens[i].NavLink + "-" + j + "-table-advance'></table></div></div></div>")
                            let tableAdvance = cardBody.find("#" + jsonData.Screens[i].NavLink + "-" + j + "-table-advance");
                            if (jsonData.Screens[i].Sections[j].columns && jsonData.Screens[i].Sections[j].columns.length > 0) {
                                tableAdvance.append("<thead class='thead-dark'><tr id='" + jsonData.Screens[i].NavLink + "-" + j + "table-advance-head-row'></tr></thead>");
                                let headRow = tableAdvance.find("#" + jsonData.Screens[i].NavLink + "-" + j + "table-advance-head-row");
                                for (let k = 0; k < jsonData.Screens[i].Sections[j].columns.length; k++) {
                                    headRow.append("<th style='min-width: 150px;'>" + jsonData.Screens[i].Sections[j].columns[k].title + "</th>");
                                }
                            }
                            if (jsonData.Screens[i].Sections[j].rows && jsonData.Screens[i].Sections[j].rows.length > 0) {
                                tableAdvance.append("<tbody class='align-items-center' id='" + jsonData.Screens[i].NavLink + "-" + j + "-table-advance-body'></tbody>");
                                let body = tableAdvance.find("#" + jsonData.Screens[i].NavLink + "-" + j + "-table-advance-body");
                                for (let k = 0; k < jsonData.Screens[i].Sections[j].rows.length; k++) {
                                    body.append("<tr id='" + jsonData.Screens[i].NavLink + "-" + j + "-" + k + "-table-advance-body-row'></tr>");
                                    let bodyRow = tableAdvance.find("#" + jsonData.Screens[i].NavLink + "-" + j + "-" + k + "-table-advance-body-row");
                                    if (jsonData.Screens[i].Sections[j].rows[k].data && jsonData.Screens[i].Sections[j].rows[k].data.length > 0) {
                                        for (let l = 0; l < jsonData.Screens[i].Sections[j].rows[k].data.length; l++) {
                                            switch (jsonData.Screens[i].Sections[j].rows[k].data[l].type) {
                                                case "text":
                                                    if (jsonData.Screens[i].Sections[j].rows[k].data[l].colspan != null && jsonData.Screens[i].Sections[j].rows[k].data[l].colspan != '') {
                                                        bodyRow.append("<td colspan='" + jsonData.Screens[i].Sections[j].rows[k].data[l].colspan + "' style='vertical-align: middle; " + jsonData.Screens[i].Sections[j].rows[k].data[l].style +"'>" + jsonData.Screens[i].Sections[j].rows[k].data[l].text + "</td>");
                                                    }
                                                    else {
                                                        bodyRow.append("<td style='vertical-align: middle; " + jsonData.Screens[i].Sections[j].rows[k].data[l].style +"'>" + jsonData.Screens[i].Sections[j].rows[k].data[l].text + "</td>");
                                                    }
                                                    break;
                                                case "select":
                                                    if (jsonData.Screens[i].Sections[j].rows[k].data[l].colspan != null && jsonData.Screens[i].Sections[j].rows[k].data[l].colspan != '') {
                                                        bodyRow.append("<td colspan='" + jsonData.Screens[i].Sections[j].rows[k].data[l].colspan + "' id='" + jsonData.Screens[i].Sections[j].rows[k].data[l].name + j + "-" + k + "-" + l + "-td'></td>");
                                                    }
                                                    else {
                                                        bodyRow.append("<td id='" + jsonData.Screens[i].Sections[j].rows[k].data[l].name + j + "-" + k + "-" + l + "-td'></td>");
                                                    }
                                                    let td = bodyRow.find("#" + jsonData.Screens[i].Sections[j].rows[k].data[l].name + j + "-" + k + "-" + l + "-td");
                                                    if (jsonData.Screens[i].Sections[j].rows[k].data[l].isAvailable) {
                                                        td.append("<select class='form-control' id='" + jsonData.Screens[i].Sections[j].rows[k].data[l].name + j + "-" + k + "-" + l + "'></select>");
                                                        let addedSelect = td.find("#" + jsonData.Screens[i].Sections[j].rows[k].data[l].name + j + "-" + k + "-" + l);
                                                        if (jsonData.Screens[i].Sections[j].rows[k].data[l].options && jsonData.Screens[i].Sections[j].rows[k].data[l].options.length > 0) {
                                                            for (let m = 0; m < jsonData.Screens[i].Sections[j].rows[k].data[l].options.length; m++) {
                                                                if (jsonData.Screens[i].Sections[j].rows[k].data[l].options[m].isSelected)
                                                                    addedSelect.append("<option selected='selected' value='" + jsonData.Screens[i].Sections[j].rows[k].data[l].options[m].value + "'>" + jsonData.Screens[i].Sections[j].rows[k].data[l].options[m].label + "</option>");
                                                                else
                                                                    addedSelect.append("<option value='" + jsonData.Screens[i].Sections[j].rows[k].data[l].options[m].value + "'>" + jsonData.Screens[i].Sections[j].rows[k].data[l].options[m].label + "</option>");
                                                            }
                                                        }
                                                        if (jsonData.Screens[i].Sections[j].rows[k].data[l].required)
                                                            addedSelect.attr("required", "required");
                                                        if (jsonData.Screens[i].Sections[j].rows[k].data[l].placeholder)
                                                            addedSelect.attr("placeholder", jsonData.Screens[i].Sections[j].rows[k].data[l].placeholder);
                                                    }
                                                    break;
                                                case "icon_input":
                                                    if (jsonData.Screens[i].Sections[j].rows[k].data[l].colspan != null && jsonData.Screens[i].Sections[j].rows[k].data[l].colspan != '') {
                                                        bodyRow.append("<td style='" + jsonData.Screens[i].Sections[j].rows[k].data[l].style+"' colspan='" + jsonData.Screens[i].Sections[j].rows[k].data[l].colspan + "' id='" + jsonData.Screens[i].Sections[j].rows[k].data[l].name + j + "-" + k + "-" + l + "-td'></td>");
                                                    }
                                                    else {
                                                        bodyRow.append("<td style='" + jsonData.Screens[i].Sections[j].rows[k].data[l].style +"' id='" + jsonData.Screens[i].Sections[j].rows[k].data[l].name + j + "-" + k + "-" + l + "-td'></td>");
                                                    }
                                                    let tdInput = bodyRow.find("#" + jsonData.Screens[i].Sections[j].rows[k].data[l].name + j + "-" + k + "-" + l + "-td");
                                                    tdInput.append("<div class='input-group hd-mt-2'><div class='input-group-prepend'><span class='input-group-text'>" + jsonData.Screens[i].Sections[j].rows[k].data[l].front_icon + "</span></div><input type='text' class='form-control' id='" + jsonData.Screens[i].Sections[j].rows[k].data[l].name + j + "-" + k + "-" + l + "' aria-label='Amount (to the nearest dollar)'><div class='input-group-append'><span class='input-group-text'>" + jsonData.Screens[i].Sections[j].rows[k].data[l].back_icon + "</span></div></div>");
                                                    let addedInput = tdInput.find("#" + jsonData.Screens[i].Sections[j].rows[k].data[l].name + j + "-" + k + "-" + l);
                                                    if (jsonData.Screens[i].Sections[j].rows[k].data[l].required)
                                                        addedInput.attr("required", "required");
                                                    if (jsonData.Screens[i].Sections[j].rows[k].data[l].placeholder)
                                                        addedInput.attr("placeholder", jsonData.Screens[i].Sections[j].rows[k].data[l].placeholder);
                                                    if (jsonData.Screens[i].Sections[j].rows[k].data[l].value)
                                                        addedInput.attr("value", jsonData.Screens[i].Sections[j].rows[k].data[l].value);
                                                    break;
                                                case "plain_input":
                                                    if (jsonData.Screens[i].Sections[j].rows[k].data[l].colspan != null && jsonData.Screens[i].Sections[j].rows[k].data[l].colspan != '') {
                                                        bodyRow.append("<td style='" + jsonData.Screens[i].Sections[j].rows[k].data[l].style +"' colspan='" + jsonData.Screens[i].Sections[j].rows[k].data[l].colspan +"' id='" + jsonData.Screens[i].Sections[j].rows[k].data[l].name + j + "-" + k + "-" + l + "-td'></td>");
                                                    }
                                                    else {
                                                        bodyRow.append("<td style='" + jsonData.Screens[i].Sections[j].rows[k].data[l].style +"' id='" + jsonData.Screens[i].Sections[j].rows[k].data[l].name + j + "-" + k + "-" + l + "-td'></td>");
                                                    }
                                                    let tdInputI = bodyRow.find("#" + jsonData.Screens[i].Sections[j].rows[k].data[l].name + j + "-" + k + "-" + l + "-td");
                                                    tdInputI.append("<input type='" + jsonData.Screens[i].Sections[j].rows[k].data[l].inputType +"' class='form-control' id='" + jsonData.Screens[i].Sections[j].rows[k].data[l].name + j + "-" + k + "-" + l + "'>");
                                                    let addedInputI = tdInputI.find("#" + jsonData.Screens[i].Sections[j].rows[k].data[l].name + j + "-" + k + "-" + l);
                                                    if (jsonData.Screens[i].Sections[j].rows[k].data[l].required)
                                                        addedInputI.attr("required", "required");
                                                    if (jsonData.Screens[i].Sections[j].rows[k].data[l].value)
                                                        addedInputI.attr("value", jsonData.Screens[i].Sections[j].rows[k].data[l].value);
                                                    break;
                                                case "checkbox":
                                                    bodyRow.append("<td  style='" + jsonData.Screens[i].Sections[j].rows[k].data[l].style +"'><label class='checkbox checkbox-site'><input type='checkbox' name='" + jsonData.Screens[i].Sections[j].rows[k].data[l].name + "'><span></span></label></td>");
                                                    break;
                                                default:
                                                    break;
                                            }
                                        }
                                    }
                                }
                            }
                            break;
                        case "six-columns":
                            if (jsonData.Screens[i].Sections[j].rows && jsonData.Screens[i].Sections[j].rows.length > 0) {
                                for (let k = 0; k < jsonData.Screens[i].Sections[j].rows.length; k++) {
                                    cardBody.append("<div class='row align-items-center' id='" + jsonData.Screens[i].NavLink + "-" + j + "-" + k + "-six-col-row'></div>");
                                    let row = cardBody.find("#" + jsonData.Screens[i].NavLink + "-" + j + "-" + k + "-six-col-row");
                                    if (jsonData.Screens[i].Sections[j].rows[k].marginBottomClass)
                                        row.addClass(jsonData.Screens[i].Sections[j].rows[k].marginBottomClass);
                                    if (jsonData.Screens[i].Sections[j].rows[k].columns && jsonData.Screens[i].Sections[j].rows[k].columns.length > 0) {
                                        for (let l = 0; l < jsonData.Screens[i].Sections[j].rows[k].columns.length; l++) {
                                            switch (jsonData.Screens[i].Sections[j].rows[k].columns[l].type) {
                                                case "label":
                                                    let tag = "<div class='col-md-2'><span class='font-weight-bold'>" + jsonData.Screens[i].Sections[j].rows[k].columns[l].text;
                                                    if (jsonData.Screens[i].Sections[j].rows[k].columns[l].required)
                                                        tag += "<span class='hd-required'> *</span></span>";
                                                    else
                                                        tag += "<span class='hd-required'></span></span>";
                                                    tag += "</div>"
                                                    row.append(tag);
                                                    break;
                                                case "icon_input":
                                                    row.append("<div class='col-md-3 mb-3' id='" + jsonData.Screens[i].Sections[j].rows[k].columns[l].name + j + "-" + k + "-" + l + "-col'></div>");
                                                    let col = row.find("#" + jsonData.Screens[i].Sections[j].rows[k].columns[l].name + j + "-" + k + "-" + l + "-col");
                                                    col.append("<div class='input-group hd-mt-2'><div class='input-group-prepend'><span class='input-group-text'>" + jsonData.Screens[i].Sections[j].rows[k].columns[l].front_icon + "</span></div><input type='text' class='form-control' id='" + jsonData.Screens[i].Sections[j].rows[k].columns[l].name + j + "-" + k + "-" + l + "' aria-label='Amount (to the nearest dollar)'><div class='input-group-append'><span class='input-group-text'>" + jsonData.Screens[i].Sections[j].rows[k].columns[l].back_icon + "</span></div></div>");
                                                    let addedInput = col.find("#" + jsonData.Screens[i].Sections[j].rows[k].columns[l].name + j + "-" + k + "-" + l);
                                                    if (jsonData.Screens[i].Sections[j].rows[k].columns[l].required)
                                                        addedInput.attr("required", "required");
                                                    if (jsonData.Screens[i].Sections[j].rows[k].columns[l].placeholder)
                                                        addedInput.attr("placeholder", jsonData.Screens[i].Sections[j].rows[k].columns[l].placeholder);
                                                    break;
                                                case "icon":
                                                    let iconTag = "<div class='col-md-1'>";
                                                    if (jsonData.Screens[i].Sections[j].rows[k].columns[l].isAvailable)
                                                        iconTag += "<i class='" + jsonData.Screens[i].Sections[j].rows[k].columns[l].icon + " text-site'></i>";
                                                    iconTag += "</div>";
                                                    row.append(iconTag);
                                                    break;
                                                default:
                                                    break;
                                            }
                                        }
                                    }
                                }
                            }
                            break;
                        case "footer_buttons":
                            let mainForm = $("#main-container").find("#" + jsonData.Screens[i].NavLink + "-main-form");
                            mainForm.append("<div class='card-footer text-right' id='" + jsonData.Screens[i].NavLink + "-" + j + "-footer'></div>");
                            let footer = mainForm.find("#" + jsonData.Screens[i].NavLink + "-" + j + "-footer");
                            if (jsonData.Screens[i].Sections[j].buttons && jsonData.Screens[i].Sections[j].buttons.length > 0) {
                                for (let k = 0; k < jsonData.Screens[i].Sections[j].buttons.length; k++) {
                                    if (jsonData.Screens[i].Sections[j].buttons[k].isLight) {
                                        if (k == jsonData.Screens[i].Sections[j].buttons.length - 1)
                                            footer.append("<button type='reset' class='btn btn-light-site'>" + jsonData.Screens[i].Sections[j].buttons[k].text + "</button>");
                                        else
                                            footer.append("<button type='reset' class='btn btn-light-site mr-2'>" + jsonData.Screens[i].Sections[j].buttons[k].text + "</button>");
                                    } else if (jsonData.Screens[i].Sections[j].buttons[k].isSite) {
                                        if (k == jsonData.Screens[i].Sections[j].buttons.length - 1)
                                            footer.append("<button type='reset' class='btn btn-site'>" + jsonData.Screens[i].Sections[j].buttons[k].text + "</button>");
                                        else
                                            footer.append("<button type='reset' class='btn btn-site mr-2'>" + jsonData.Screens[i].Sections[j].buttons[k].text + "</button>");
                                    } else {
                                        if (k == jsonData.Screens[i].Sections[j].buttons.length - 1)
                                            footer.append("<button type='reset' class='btn btn-secondary'>" + jsonData.Screens[i].Sections[j].buttons[k].text + "</button>");
                                        else
                                            footer.append("<button type='reset' class='btn btn-secondary mr-2'>" + jsonData.Screens[i].Sections[j].buttons[k].text + "</button>");
                                    }
                                }
                            }
                            break;
                        default:
                            break;
                    }
                }
            }
        }
    }
}

function renderRadio(layout, type, jsonData, i, j, k, l = null, formTag = null, mainCol = null) {
    if (layout == "full" && type == "multiple_rows") {
        formTag.removeClass("mt-5");
        formTag.append("<div class='row' id='" + jsonData.Screens[i].Sections[j].rows[k].name + "-" + j + "-" + k + "-row'></div>");
        if (jsonData.Screens[i].Sections[j].rows[k].options && jsonData.Screens[i].Sections[j].rows[k].options.length > 0) {
            let row = formTag.find("#" + jsonData.Screens[i].Sections[j].rows[k].name + "-" + j + "-" + k + "-row");
            for (let l = 0; l < jsonData.Screens[i].Sections[j].rows[k].options.length; l++) {
                if (jsonData.Screens[i].Sections[j].rows[k].options[l].label == "Non-Profit")
                    row.append("<div class='col-md-2 col-sm-5 mr-2 hd-mt-2'><label class='radio radio-site'><input type='radio' name='" + jsonData.Screens[i].Sections[j].rows[k].name + "' id='" + jsonData.Screens[i].Sections[j].rows[k].name + "-" + j + "-" + k + "-" + l + "'><span class='mr-2'></span>" + jsonData.Screens[i].Sections[j].rows[k].options[l].label + "</label></div>");
                else {
                    if (l > 0)
                        row.append("<div class='col-md-1 col-sm-5 mr-2 hd-mt-2'><label class='radio radio-site'><input type='radio' name='" + jsonData.Screens[i].Sections[j].rows[k].name + "' id='" + jsonData.Screens[i].Sections[j].rows[k].name + "-" + j + "-" + k + "-" + l + "'><span class='mr-2'></span>" + jsonData.Screens[i].Sections[j].rows[k].options[l].label + "</label></div>");
                    else
                        row.append("<div class='col-md-1 col-sm-5 hd-mt-2'><label class='radio radio-site'><input type='radio' name='" + jsonData.Screens[i].Sections[j].rows[k].name + "' id='" + jsonData.Screens[i].Sections[j].rows[k].name + "-" + j + "-" + k + "-" + l + "'><span class='mr-2'></span>" + jsonData.Screens[i].Sections[j].rows[k].options[l].label + "</label></div>");
                }
                let addedRadio = row.find("#" + jsonData.Screens[i].Sections[j].rows[k].name + "-" + j + "-" + k + "-" + l);
                if (jsonData.Screens[i].Sections[j].rows[k].options[l].checked)
                    addedRadio.attr("checked", "checked");
            }
        }
    } else if (layout == "two_columns" && type == "full") {
        mainCol.append("<div class='row' id='" + jsonData.Screens[i].NavLink + "-" + j + "-" + k + "-" + l + "-row'></div>");
        if (jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].options && jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].options.length > 0) {
            let row = mainCol.find("#" + jsonData.Screens[i].NavLink + "-" + j + "-" + k + "-" + l + "-row");
            for (let m = 0; m < jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].options.length; m++) {
                if (jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].options[m].label == "Female")
                    row.append("<div class='col-md-1 col-sm-5 mr-2 hd-mt-2'><label class='radio radio-site'><input type='radio' name='" + jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].name + "' id='" + jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].name + "-" + j + "-" + k + "-" + l + "-" + m + "'><span class='mr-2'></span> " + jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].options[m].label + " </label></div>");
                else
                    row.append("<div class='col-md-1 col-sm-5 hd-mt-2'><label class='radio radio-site'><input type='radio' name='" + jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].name + "' id='" + jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].name + "-" + j + "-" + k + "-" + l + "-" + m + "'><span class='mr-2'></span> " + jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].options[m].label + " </label></div>");
                let addedRadio = row.find("#" + jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].name + "-" + j + "-" + k + "-" + l + "-" + m);
                if (jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].options[m].checked)
                    addedRadio.attr("checked", "checked");
            }
        }
    }
}

function renderRadioList(layout, type, jsonData, i, j, k, l = null, formTag = null, mainCol = null) {
    if (layout == "full" && type == "multiple_rows") {
        formTag.append("<div class='radio-list mt-3' id='" + jsonData.Screens[i].Sections[j].rows[k].name + "-" + j + "-" + k + "'></div>");
        if (jsonData.Screens[i].Sections[j].rows[k].options && jsonData.Screens[i].Sections[j].rows[k].options.length > 0) {
            let radioList = formTag.find("#" + jsonData.Screens[i].Sections[j].rows[k].name + "-" + j + "-" + k);
            for (let l = 0; l < jsonData.Screens[i].Sections[j].rows[k].options.length; l++) {
                radioList.append("<label class='radio radio-site'><input type='radio' name='" + jsonData.Screens[i].Sections[j].rows[k].name + "' id='" + jsonData.Screens[i].Sections[j].rows[k].name + "-" + j + "-" + k + "-" + l + "'><span></span>" + jsonData.Screens[i].Sections[j].rows[k].options[l].label + "</label>");
                let addedRadio = radioList.find("#" + jsonData.Screens[i].Sections[j].rows[k].name + "-" + j + "-" + k + "-" + l);
                if (jsonData.Screens[i].Sections[j].rows[k].options[l].checked)
                    addedRadio.attr("checked", "checked");
            }
        }
    } else if (layout == "two_columns" && type == "full") {
        mainCol.append("<div class='radio-list' id='" + jsonData.Screens[i].NavLink + "-" + j + "-" + k + "-" + l + "-row'></div>");
        if (jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].options && jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].options.length > 0) {
            let row = mainCol.find("#" + jsonData.Screens[i].NavLink + "-" + j + "-" + k + "-" + l + "-row");
            for (let m = 0; m < jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].options.length; m++) {
                row.append("<label class='radio radio-site'><input type='radio' name='" + jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].name + "' id='" + jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].name + "-" + j + "-" + k + "-" + l + "-" + m + "'><span></span>" + jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].options[m].label + "</label>");
                let addedRadio = row.find("#" + jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].name + "-" + j + "-" + k + "-" + l + "-" + m);
                if (jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].options[m].checked)
                    addedRadio.attr("checked", "checked");
            }
        }
    }
}

function renderIconInput(layout, type, jsonData, i, j, k, l = null, row = null, controlsRow = null) {
    if (layout == "two_columns" && type == "one_column") {
        row.append("<div class='col-md-4' id='" + jsonData.Screens[i].NavLink + "-" + j + "-" + k + "-" + l + "-col'></div>");
        let colInput = row.find("#" + jsonData.Screens[i].NavLink + "-" + j + "-" + k + "-" + l + "-col");
        colInput.append("<div class='input-group hd-mt-2'><div class='input-group-prepend'><span class='input-group-text'>" + jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].front_icon + "</span></div><input type='text' class='form-control' id='" + jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].name + j + "-" + k + "-" + l + "' aria-label='Amount(to the nearest dollar)'><div class='input-group-append'><span class='input-group-text'>" + jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].back_icon + "</span></div></div>");
        let addedInput = colInput.find("#" + jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].name + j + "-" + k + "-" + l);
        if (jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].required)
            addedInput.attr("required", "required");
        if (jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].placeholder)
            addedInput.attr("placeholder", jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].placeholder);
    } else if (layout == "two-cols" && type == null) {
        controlsRow.append("<div class='col-md-6'><div class='input-group hd-mt-2'><div class='input-group-prepend'><span class='input-group-text'>" + jsonData.Screens[i].Sections[j].columns[k].front_icon + "</span></div><input type='text' class='form-control' name='" + jsonData.Screens[i].Sections[j].columns[k].name + "' id='" + jsonData.Screens[i].Sections[j].columns[k].name + "-" + j + "-" + k + "' aria-label='Amount(to the nearest dollar)'><div class='input-group-append'><span class='input-group-text'>" + jsonData.Screens[i].Sections[j].columns[k].back_icon + "</span></div></div></div>");
        let addedIconInput = controlsRow.find("#" + jsonData.Screens[i].Sections[j].columns[k].name + "-" + j + "-" + k);
        if (jsonData.Screens[i].Sections[j].columns[k].required)
            addedIconInput.attr("required", "required");
        if (jsonData.Screens[i].Sections[j].columns[k].placeholder)
            addedIconInput.attr("placeholder", jsonData.Screens[i].Sections[j].columns[k].placeholder);
    }
}

function renderSelect(layout, type, jsonData, i, j, k, l, col = null, row = null) {
    if (layout == "two_columns" && type == "three_columns") {
        col.append("<select class='form-control' id='" + jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].bottom_column.name + j + "-" + k + "-" + l + "'></select>");
        let addedSelect = col.find("#" + jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].bottom_column.name + j + "-" + k + "-" + l);
        if (jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].bottom_column.options && jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].bottom_column.options.length > 0) {
            for (let m = 0; m < jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].bottom_column.options.length; m++) {
                if (jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].bottom_column.options[m].selected)
                    addedSelect.append("<option value='" + jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].bottom_column.options[m].value + "' selected>" + jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].bottom_column.options[m].label + "</option>");
                else
                    addedSelect.append("<option value='" + jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].bottom_column.options[m].value + "'>" + jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].bottom_column.options[m].label + "</option>");
            }
        }
        if (jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].bottom_column.required)
            addedSelect.attr("required", "required");
        if (jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].bottom_column.placeholder)
            addedSelect.attr("placeholder", jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].bottom_column.placeholder);
    } else if (layout == "two_columns" && type == "two_columns") {
        row.append("<div class='col-md-4' id='" + jsonData.Screens[i].NavLink + "-" + j + "-" + k + "-" + l + "-col'></div>");
        let colSelect = row.find("#" + jsonData.Screens[i].NavLink + "-" + j + "-" + k + "-" + l + "-col");
        colSelect.append("<select class='form-control' id='" + jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].name + j + "-" + k + "-" + l + "'></select>");
        let addedSelect = colSelect.find("#" + jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].name + j + "-" + k + "-" + l);
        if (jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].options && jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].options.length > 0) {
            for (let m = 0; m < jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].options.length; m++) {
                addedSelect.append("<option value='" + jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].options[m].value + "'>" + jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].options[m].label + "</option>");
            }
        }
        if (jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].required)
            addedSelect.attr("required", "required");
        if (jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].placeholder)
            addedSelect.attr("placeholder", jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].placeholder);
    } else if (layout == "two_columns" && type == "one_column") {
        row.append("<div class='col-md-4' id='" + jsonData.Screens[i].NavLink + "-" + j + "-" + k + "-" + l + "-col'></div>");
        let col = row.find("#" + jsonData.Screens[i].NavLink + "-" + j + "-" + k + "-" + l + "-col");
        col.append("<select class='form-control' id='" + jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].name + j + "-" + k + "-" + l + "'></select>");
        let addedSelect = col.find("#" + jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].name + j + "-" + k + "-" + l);
        if (jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].options && jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].options.length > 0) {
            for (let m = 0; m < jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].options.length; m++) {
                if (jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].options[m].selected)
                    addedSelect.append("<option value='" + jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].options[m].value + "' selected>" + jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].options[m].label + "</option>");
                else
                    addedSelect.append("<option value='" + jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].options[m].value + "'>" + jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].options[m].label + "</option>");
            }
        }
        if (jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].required)
            addedSelect.attr("required", "required");
        if (jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].placeholder)
            addedSelect.attr("placeholder", jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].placeholder);
    } else if (layout == "two_columns" && type == "two_full_columns") {
        col.append("<select class='form-control' id='" + jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].bottom_column.name + j + "-" + k + "-" + l + "'></select>");
        let addedSelect = col.find("#" + jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].bottom_column.name + j + "-" + k + "-" + l);
        if (jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].bottom_column.options && jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].bottom_column.options.length > 0) {
            for (let m = 0; m < jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].bottom_column.options.length; m++) {
                if (jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].bottom_column.options[m].selected)
                    addedSelect.append("<option value='" + jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].bottom_column.options[m].value + "' selected>" + jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].bottom_column.options[m].label + "</option>");
                else
                    addedSelect.append("<option value='" + jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].bottom_column.options[m].value + "'>" + jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].bottom_column.options[m].label + "</option>");
            }
        }
        if (jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].bottom_column.required)
            addedSelect.attr("required", "required");
        if (jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].bottom_column.placeholder)
            addedSelect.attr("placeholder", jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].bottom_column.placeholder);
    }
}

function renderHtmlP(layout, type, jsonData, i, j, k = null, l = null, cardBody = null, formTag = null, mainCol = null) {
    if (layout == "full" && type == null) {
        cardBody.append("<p>" + jsonData.Screens[i].Sections[j].text + "</p>");
    } else if (layout == "full" && type == "multiple_rows") {
        formTag.append("<p class='font-weight-bold'>" + jsonData.Screens[i].Sections[j].rows[k].text + "</p>");
    } else if (layout == "two_columns" && type == "full") {
        mainCol.append("<p>" + jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].text + "</p>");
    }
}

function renderHtmlSpan(layout, type, jsonData, i, j, k, formTag = null, controlsRow = null) {
    if (layout == "full" && type == "multiple_rows") {
        formTag.append("<span class='text-site font-weight-bold'>" + jsonData.Screens[i].Sections[j].rows[k].text + "</span>");
    } else if (layout == "two-cols" && type == null) {
        controlsRow.append("<div class='col-md-4'><span class='font-weight-bold'>" + jsonData.Screens[i].Sections[j].columns[k].text + "</span></div>");
    }
}

function renderLabel(layout, type, jsonData, i, j, k, l = null, controlsRow = null, col = null) {
    if (layout == "two_columns" && type == "full") {
        if (jsonData.Screens[i].Sections[j].columns[0].left_column[k].isAvailable) {
            controlsRow.append("<div class='col-md-3 text-right hd-sm-text-left' id='" + jsonData.Screens[i].NavLink + "-" + j + "-" + k + "-left-controls-col'></div>");
            let leftCol = controlsRow.find("#" + jsonData.Screens[i].NavLink + "-" + j + "-" + k + "-left-controls-col");
            let tag = "<span class='font-weight-bold'>" + jsonData.Screens[i].Sections[j].columns[0].left_column[k].text;
            if (jsonData.Screens[i].Sections[j].columns[0].left_column[k].required)
                tag += "<span class='hd-required'> *</span></span>";
            else
                tag += "<span class='hd-required'></span></span>";
            if (jsonData.Screens[i].Sections[j].columns[0].left_column[k].isDescriptionAvailable)
                tag += "<br><span class='font-size-sm'>" + jsonData.Screens[i].Sections[j].columns[0].left_column[k].descriptionText + "</span>";
            leftCol.append(tag);
        } else
            controlsRow.append("<div class='col-md-3'></div>");
    } else if (layout == "two_columns" && type == "three_columns") {
        let tag = "<p>" + jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].top_column.text;
        if (jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].top_column.required)
            tag += "<span class='hd-required'> *</span></p>";
        else
            tag += "<span class='hd-required'></span></p>";
        col.append(tag);
    } else if (layout == "two_columns" && type == "two_full_columns") {
        let tag = "<p>" + jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].top_column.text;
        if (jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].top_column.required)
            tag += "<span class='hd-required'> *</span></p>";
        else
            tag += "<span class='hd-required'></span></p>";
        col.append(tag);
    }
}

function renderInput(layout, type, jsonData, i, j, k, l = null, col = null, controlsRow = null) {
    if (layout == "two_columns" && type == "three_columns") {
        col.append("<input type='text' class='form-control' id='" + jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].bottom_column.name + j + "-" + k + "-" + l + "'>");
        let addedInput = col.find("#" + jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].bottom_column.name + j + "-" + k + "-" + l);
        if (jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].bottom_column.required)
            addedInput.attr("required", "required");
        if (jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].bottom_column.placeholder)
            addedInput.attr("placeholder", jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].bottom_column.placeholder);
    } else if (layout == "two_columns" && type == "two_full_columns") {
        col.append("<input type='text' class='form-control' id='" + jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].bottom_column.name + j + "-" + k + "-" + l + "'>");
        let addedInput = col.find("#" + jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].bottom_column.name + j + "-" + k + "-" + l);
        if (jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].bottom_column.required)
            addedInput.attr("required", "required");
        if (jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].bottom_column.placeholder)
            addedInput.attr("placeholder", jsonData.Screens[i].Sections[j].columns[0].right_column[k].columns[l].bottom_column.placeholder);
    } else if (layout == "two-cols" && type == null) {
        controlsRow.append("<div class='col-md-6'><input type='text' class='form-control hd-mt-2' name='" + jsonData.Screens[i].Sections[j].columns[k].name + "' id='" + jsonData.Screens[i].Sections[j].columns[k].name + "-" + j + "-" + k + "'></div>");
        let addedInput = controlsRow.find("#" + jsonData.Screens[i].Sections[j].columns[k].name + "-" + j + "-" + k);
        if (jsonData.Screens[i].Sections[j].columns[k].required)
            addedInput.attr("required", "required");
        if (jsonData.Screens[i].Sections[j].columns[k].placeholder)
            addedInput.attr("placeholder", jsonData.Screens[i].Sections[j].columns[k].placeholder);
    }
}