$(document).ready(function() {
	$('#search-btn').on('click', function() {
		var username = $('#username').val()

		if (username === '') {
			return
		}

		$.ajax({
      type: "POST",
      url: "github/" + username,
      dataType: "json",
      'success' : function(data) {
        displayRepos(data)
        return false
      },
      'error' : function(request, error) {
        alert('Please enter a valid Username')
        return false
      }
    })
	})

	$('#username').keypress(function (e) {
	  var key = e.which;
	  if(key == 13)  // the enter key code
	  	{
		    $('#search-btn').click();
		    return false;  
		  }
	}); 

	// Ajax call to add favorite repo to the database
	$('#repo-list').on('click', '.add-btn', function() {

		let name = $(this).siblings('.url').attr('text')
		let url = $(this).siblings('.url').attr('text-url') 
		let language = $(this).siblings('.language').attr('text')
		let version = $(this).siblings('td.version').attr('text')

		$.ajax({
      type: "POST",
      url: "addfavorite/",
      data: { name: name, language: language, url: url, version: version},
      dataType: "json",
      'success' : function(repo_exists) {
        if(!repo_exists){
        	displayFavRepos(name, language, version, url)
        }
        return false
      },
      'error' : function(request, error) {
        alert('Please enter a valid Username')
        return false
      }
    })
	})

	// Ajax call to remove favorite repository from list
	$('#fav-repo-list').on('click', '.remove-btn', function() {
		let name = $(this).siblings('.url').attr('text')

		$.ajax({
      type: "DELETE",
      url: "removefavorite/",
      data: { name: name },
      dataType: "json",
      'success' : function(data) {
      	window.location.reload()
        return false
      },
      'error' : function(request, error) {
        alert('Please enter a valid Username')
        return false
      }
    })
	})

	$('#username').on('change', function() {
		var username = $('#username').val()

		if (username === '') {
			$('#repo-list').html('')
		}
	})  
})


// Dynamically displays the 10 repositories when a username is searched
function displayRepos(data) {
	var $container = $('.content #repo-list')
	var html = ``
	var dataLen = data.length

	if(dataLen > 10) {
		dataLen = 10
	}

	for(let i = 0; i < dataLen; i++) {
		html += `
			<tr>
	      <td class="url" text="${data[i]['full_name']}" text-url="${data[i]['svn_url']}"><a href="${data[i]['svn_url']}" target="_blank"> ${data[i]['full_name']} </a></td>
	      <td class="language" text="${data[i]['language']}">${data[i]['language']}</td>
	      <td class="version" text="v1">v1</td>
	      <td class="add-btn"><button class="btn btn-success"> Add </button></td>
	    </tr>
		` 
	}

	$container.html(html)
}

// Adds the repository to the favorites list dynamically
function displayFavRepos(name, language, version, url) {
	var $container = $('.content #fav-repo-list')

	var html = `
		<tr>
      <td class="url" text="${name}" text-url="${url}"><a href="${url}" target="_blank"> ${name} </a></td>
      <td class="language" text="${language}">${language}</td>
      <td class="version" text="v1">v1</td>
      <td class="remove-btn"><button class="btn btn-danger"> Remove </button></td>
    </tr>
	`

	$container.append(html)
}


