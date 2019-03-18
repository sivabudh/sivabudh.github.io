$(document).ready(function() {
	$("#fileuploader").uploadFile({
        fileName:"myfile",
    })
    if (navigator.platform != "MacIntel") {
        $('.new-ticket-table-caption')[0].style.paddingRight = `${$('.new-ticket-table-content')[0].offsetWidth - $('.new-ticket-table-content')[0].clientWidth}px`
    }


    let selectedCircuits = []

    $('input[type="checkbox"]').on('change', function() {
        const id = parseInt(this.id, 10)
        const rows = $('.new-ticket-table-row').toArray()
        const row = rows[id]
        const name = $(row).children()[2].innerHTML
        if (this.checked) {
            selectedCircuits.push(name)
            const popup = $('.new-ticket-table-popup')[0]
            if ($(row).hasClass('has-plan')) {
                popup.style.display = "block"
                $(popup).find('.popup-id')[0].innerHTML = `CID ${$(row).children()[1].innerHTML}`
                $(popup).find('.popup-name')[0].innerHTML = name
            } else {
                popup.style.display = "none"
            }
        } 
        if (!this.checked) {
            selectedCircuits.splice(selectedCircuits.indexOf(name), 1)
        }
        $('.new-ticket-selected-circuits')[0].innerHTML = `Selected circuits: ${selectedCircuits.join(', ')}`

    })

    $(document).click(function(e) {
        if (e.target !== $('.new-ticket-table-popup')[0]) {
            $('.new-ticket-table-popup')[0].style.display = "none"
        }
    })

    let caption, file, files = []
        input = $('#file-input')

    input.on('change', function(e) { 
        files.push(this.files[0])
        file = this.files[0]
        if (file) {
            $('.new-ticket-file-input-name')[0].innerHTML = file.name
        } else {
            $('.new-ticket-file-input-name')[0].innerHTML = null
        }
    })
    $('#caption').on('change', function() {
        caption = this.value
    })
    $("#add-files-btn").click(function(e) {
        if (caption && file) {
            $('.new-ticket-files table').append(
                `<tr>
                    <td>${caption}</td>
                    <td>${(file.size / (1024 * 1024)).toFixed(2)} MB</td>
                    <td><i class="fas fa-times remove"></i></td>
                </tr>`
            );
            $('#caption')[0].value = null
            $('.new-ticket-file-input-name')[0].innerHTML = 'File name...'
            file = null
        }    
        if (files.length == 5) {
            $('#file-input').attr('disabled', true)
            $('#add-files-btn').attr('disabled', true)
        }
        e.preventDefault()
        
        $('.remove').on('click', function(e) {
            for (let i = 0; i < $('.remove').length; i++) {
                if (this == $('.remove')[i]) {
                    files.splice(i, 1)
                    $('.new-ticket-files table')[i].remove()
                }
            }
        })
    })
})